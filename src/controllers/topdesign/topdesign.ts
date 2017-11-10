import * as Re from '../../services/response';
import {getConnection} from '../../services/connection';
import Utility = require('../../util/util');
import groupBy = Utility.groupBy;
import imgur = Utility.imgurUpload;

const con = getConnection();
module Topdesign {


    /**
     * @api {get} /topdesign/posts Get all posts
     * @apiVersion 1.2.2
     * @apiName GetAllPosts
     * @apiDescription Get all Posts
     * @apiGroup Posts
     *
     * @apiSuccess (200) {Object[]} results
     *
     */

    export function findAllTopDesigns (req, res) {
        // Return all Posts
        con.query(
            'SELECT designs.id, designs.username, designs.avatar, designs.userid, designs.image, COUNT(likes.postid) ' +
            'AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid ' +
            'WHERE designs.active = 1 GROUP BY designs.id ORDER BY likes DESC',
            function (error, results) {
                if (error) { throw error; }
                Re.success(res, results);
            }
        );
    }

    /**
     * @api {get} /topdesign/posts/currentmonth Get all Posts for current Month
     * @apiVersion 1.2.2
     * @apiName GetAllPostsCurrMonth
     * @apiDescription Get all Posts for current Month (query params??)
     * @apiGroup Posts
     *
     * @apiSuccess (200) {Object[]} results
     *
     */
    export function findAllTopDesignsCurrentMonth (req, res) {
        // Return all Posts from current month
        const timeshort = Utility.timeshort(new Date());
        con.query(
            'SELECT designs.id, designs.username, designs.avatar, designs.userid, designs.image, ' +
            'COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes ' +
            'AS likes ON designs.id = likes.postid WHERE designs.active = 1 AND timeshort = ? GROUP BY designs.id ' +
            'ORDER BY likes DESC',
            [timeshort],
            function (error, results) {
                if (error) { throw error; }
                Re.success(res, results);
            }
        );
    }

    /**
     * @api {get} /topdesign/posts/month  Get all Posts sorted by Month
     * @apiVersion 1.2.2
     * @apiName GetAllPostsByMonth
     * @apiDescription Return all Posts grouped by month
     * @apiGroup Posts
     *
     * @apiSuccess (200) {Object[]} results
     *
     */
    export function findAllTopDesignsMonth (req, res) {
        // Return all Posts grouped by month
        con.query(
            'SELECT designs.id, designs.timeshort, designs.username, designs.avatar, designs.userid, designs.image, ' +
            'COUNT(likes.postid) AS likes FROM discord_topdesign AS designs ' +
            'LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.active = 1 ' +
            'GROUP BY designs.id ' +
            'ORDER BY designs.timeshort DESC, likes DESC',
            function (error, results) {
                if (error) { throw error; }
                let grouped = groupBy(results, 'timeshort');
                for (let key in grouped) {
                    if (grouped.hasOwnProperty(key)) {
                        for (let i = 0; i < grouped[key].length; i++) {
                            grouped[key][i].winner = false;
                        }
                        grouped[key][0].winner = true;
                    }
                }
                Re.success(res, grouped);
            }
        );
    }

    /**
     * @api {get} /topdesign/posts/:id  Get Post by Id
     * @apiVersion 1.2.2
     * @apiName GetById
     * @apiDescription Get Post by Id
     * @apiGroup Posts
     *
     * @apiSuccess (200) {Object} result
     *
     * @apiError not_found Not found (404)
     *
     */
    export function findTopDesignbyID (req, res) {
        const id = req.params.id;
        con.query(
            'SELECT designs.id, designs.timeshort, designs.username, designs.avatar, ' +
            'designs.userid, designs.image, designs.active, COUNT(likes.postid)' +
            ' AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes ' +
            'AS likes ON designs.id = likes.postid WHERE designs.id = ?',
            [id],
            function (error, results) {
                if (error) { throw error; }
                results = results[0];
                if (!results.id) {
                    Re.not_found(res);
                } else {
                    Re.success(res, results);
                }
            }
        );
    }

// noinspection RedundantIfStatementJS
    function findTopDesignbyUserIDandTime (userid) {
        return new Promise((resolve, reject) => {
            const timeshort = Utility.timeshort(new Date());
            con.query(
                'SELECT discord_topdesign.id FROM discord_topdesign WHERE discord_topdesign.userid = ? AND discord_topdesign.timeshort = ?',
                [userid, timeshort], function (error, results) {
                if (error) {
                    reject(error);
                    throw error;
                }
                if (results.length === 0) {
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    /**
     * @api {post} /topdesign/posts/  Add Post
     * @apiVersion 1.2.2
     * @apiName AddPost
     * @apiDescription Add new post
     * @apiGroup Posts
     *
     * @apiParam {String} username
     * @apiParam {Number} userid
     * @apiParam {Object} avatar
     * @apiParam {Object} content
     * @apiParam {Object} image
     *
     * @apiSuccess (200) {Object} result
     * @apiSuccess (200) {String} result.action
     * @apiSuccess (200) {Number} result.postid
     *
     * @apiSuccessExample {json} Success-Example:
     *     HTTP/1.1 200
     *     {
     *        "action": "add",
     *        "postid": 3
     *     }
     *
     * @apiError body_missing Request Body is missing (500 code for some reason)
     * @apiError 408 {error: 'You already inserted the topdesign for this month.'}
     *
     */
    export async function addTopDesign (req, res) {
        const body = req.body;
        if (!req.body) { return Re.body_missing(res); }

        const needed = ['username', 'userid', 'avatar', 'content', 'image'];
        for (let i = 0; i < needed.length; i++) {
            if (!body.hasOwnProperty(needed[i])) {
                return Re.body_missing(res);
            }
        }

        let exists = await this.findbyUserIDandTime(body.userid);
        if (exists) {
            return Re.already_existing(res);
        }

        let data = body;
        let avatar = await imgur(body.avatar);
        let image = await imgur(body.image);
        data.avatar = avatar;
        data.image = image;
        data.timeshort = Utility.timeshort(new Date());
        con.query('INSERT INTO discord_topdesign SET ?', [data], function (error, results) {
            if (error) { throw error; }
            Re.success(res, { action: 'add', postid: results.insertId });
        });
    }

    /**
     * @api {put} /topdesign/posts/:id Update Status of Post
     * @apiVersion 1.2.2
     * @apiName UpdatePost
     * @apiDescription Update Status of Post
     * @apiGroup Posts
     *
     *
     * @apiSuccess (200) {Object} result
     * @apiSuccess (200) {String="deactivate","activate"} result.action
     * @apiSuccess (200) {Number} result.likes
     * @apiSuccess (200) {String} result.username
     *
     * @apiSuccessExample {json} Success-Example:
     *     HTTP/1.1 200
     *     {
     *        "action": "deactivate",
     *        "likes": 3,
     *        "posted_by": "JohnDoe"
     *     }
     *
     * @apiError not_found Not found (404)
     *
     */
    export async function changeTopDesignStatus (req, res) {
        const postid = req.params.id;
        con.query(
            'SELECT designs.active, designs.username,  COUNT(likes.postid) AS likes FROM discord_topdesign ' +
            'AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid ' +
            'WHERE designs.id = ? GROUP BY designs.id ORDER BY likes DESC',
            [postid],
            function (error, results) {
                if (error) { throw error; }
                let post = results[0];
                if (!post) { return Re.not_found(res); }
                switch (post.active) {
                    case 1:
                        con.query('UPDATE discord_topdesign SET active = 0 WHERE id = ?', [postid], function (error) {
                            if (error) { throw error; }
                            Re.success(res, {
                                action: 'deactivate',
                                likes: post.likes,
                                posted_by: post.username
                            });
                        });
                        break;
                    case 0:
                        con.query('UPDATE discord_topdesign SET active = 1 WHERE id = ?', [postid], function (error) {
                            if (error) { throw error; }
                            Re.success(res, {
                                action: 'activate',
                                likes: post.likes,
                                posted_by: post.username
                            });
                        });
                        break;
                    default:
                        break;
                }
            }
        );
    }

    /**
     * @api {delete} /topdesign/posts/:id Delete Post
     * @apiVersion 1.2.2
     * @apiName DeletePost
     * @apiDescription Delete Post
     * @apiGroup Posts
     *
     * @apiSuccess (200) {Object} result
     * @apiSuccess (200) {String} result.action
     *
     * @apiSuccessExample {json} Success-Example:
     *     HTTP/1.1 200
     *     {
     *        "action": "delete"
     *     }
     *
     * @apiError not_found Not found (404)
     *
     */
    export function deleteTopDesign (req, res) {
        const postid = req.params.id;

        con.query('DELETE FROM discord_topdesign WHERE id=?', [postid], function (error, results) {
            if (error) { throw error; }
            if (results.affectedRows === 0) { return Re.not_found(res); }
            Re.success(res, {
                action: 'delete'
            });
        });
    }
}
