import * as Re from '../../services/response';
import {getConnection} from '../../services/connection';
import Utility = require('../../util/util');
import groupBy = Utility.groupBy;
import imgur = Utility.imgurUpload;

const con = getConnection();
module Topdesign {

    export function findAllTopDesigns(req, res) {
        // Return all Posts
        con.query(
            'SELECT designs.id, designs.username, designs.avatar, designs.userid, designs.image, COUNT(likes.postid) ' +
                'AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid ' +
                'WHERE designs.active = 1 GROUP BY designs.id ORDER BY likes DESC',
            function(error, results) {
                if (error) {
                    throw error;
                }
                Re.success(res, results);
            }
        );
    }

    export function findAllTopDesignsCurrentMonth(req, res) {
        // Return all Posts from current month
        con.query(
            'SELECT designs.id, designs.username, designs.avatar, designs.userid, designs.image, ' +
                'COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes ' +
                'AS likes ON designs.id = likes.postid WHERE designs.active = 1 AND timeshort = ? GROUP BY designs.id ' +
                'ORDER BY likes DESC',
            [Utility.timeshort(new Date())],
            function(error, results) {
                if (error) {
                    throw error;
                }
                Re.success(res, results);
            }
        );
    }

    export function findAllTopDesignsMonth(req, res) {
        // Return all Posts grouped by month
        con.query(
            'SELECT designs.id, designs.timeshort, designs.username, designs.avatar, designs.userid, designs.image, ' +
                'COUNT(likes.postid) AS likes FROM discord_topdesign AS designs ' +
                'LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.active = 1 ' +
                'GROUP BY designs.id ' +
                'ORDER BY designs.timeshort DESC, likes DESC',
            function(error, results) {
                if (error) {
                    throw error;
                }
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

    export function findTopDesignbyID(req, res) {
        const id = req.params.id;
        con.query(
            'SELECT designs.id, designs.timeshort, designs.username, designs.avatar, ' +
                'designs.userid, designs.image, designs.active, COUNT(likes.postid)' +
                ' AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes ' +
                'AS likes ON designs.id = likes.postid WHERE designs.id = ?',
            [id],
            function(error, results) {
                if (error) {
                    throw error;
                }
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
    function findTopDesignbyUserIDandTime(userid) {
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

    export async function addTopDesign(req, res) {
        const body = req.body;

        if (await findTopDesignbyUserIDandTime(body.userid)) {
            return Re.already_existing(res);
        }

        let data = body;
        data.avatar = await imgur(body.avatar);
        data.image = await imgur(body.image);
        data.timeshort = Utility.timeshort(new Date());
        con.query('INSERT INTO discord_topdesign SET ?', [data], function(error, results) {
            if (error) {
                throw error;
            }
            Re.success(res, { action: 'add', postid: results.insertId });
        });
    }

    export async function changeTopDesignStatus(req, res) {
        const postid = req.params.id;
        con.query(
            'SELECT designs.active, designs.username,  COUNT(likes.postid) AS likes FROM discord_topdesign ' +
                'AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid ' +
                'WHERE designs.id = ? GROUP BY designs.id ORDER BY likes DESC',
            [postid],
            function(error, results) {
                if (error) {
                    throw error;
                }
                let post = results[0];
                if (!post) {
                    return Re.not_found(res);
                }
                switch (post.active) {
                    case 1:
                        con.query('UPDATE discord_topdesign SET active = 0 WHERE id = ?', [postid], function(error) {
                            if (error) {
                                throw error;
                            }
                            return Re.success(res, {
                                action: 'deactivate',
                                likes: post.likes,
                                posted_by: post.username
                            });
                        });
                        break;
                    case 0:
                        con.query('UPDATE discord_topdesign SET active = 1 WHERE id = ?', [postid], function(error) {
                            if (error) {
                                throw error;
                            }
                            return Re.success(res, {
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

    export function deleteTopDesign(req, res) {
        const postid = req.params.id;

        con.query('DELETE FROM discord_topdesign WHERE id=?', [postid], function(error, results) {
            if (error) {
                throw error;
            }
            if (results.affectedRows === 0) {
                return Re.not_found(res);
            }
            Re.success(res, {
                action: 'delete'
            });
        });
    }
}
export = Topdesign;
