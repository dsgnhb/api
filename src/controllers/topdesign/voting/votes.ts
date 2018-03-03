import * as Re from '../../../services/response';
import {getConnection} from '../../../services/connection';
import Utility = require('../../../util/util');
import groupBy = Utility.groupBy;

const con = getConnection();
module Votes {

    export async function vote(req, res) {
        const postid = req.params.postid;
        const body = req.body;
        const timeshort = Utility.timeshort(new Date());

        // FIXME: Fuck this, I see, why it's nescessay but it could be performed in the Database too...
        con.query(
            'SELECT designs.id, designs.username, COUNT(likes.postid) AS likes ' +
            'FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ' +
            'ON designs.id = likes.postid WHERE designs.active = 1 AND timeshort = ? AND designs.id = ?' +
            ' GROUP BY designs.id ORDER BY likes DESC',
            [timeshort, postid],
            function (error, results) {
                if (error) {
                    throw error;
                }
                let post = results[0];
                if (!post) {
                    return Re.not_found(res);
                }
                con.query('DELETE FROM discord_topdesign_likes ' + 'WHERE postid = ? AND userid = ?', [postid, body.userid],
                          function (error, results) {
                        if (error) {
                            throw error;
                        }
                        if (results.affectedRows === 0) {
                            con.query('INSERT INTO discord_topdesign_likes SET ?', { userid: body.userid, postid: postid },
                                      function (error) {
                                if (error) {
                                    throw error;
                                }
                                Re.success(res, {
                                    action: 'add',
                                    likes: post.likes + 1,
                                    posted_by: post.username
                                });
                            });
                        } else {
                            Re.success(res, {
                                action: 'remove',
                                likes: post.likes - 1,
                                posted_by: post.username
                            });
                        }
                    });
            }
        );
    }

    export async function voted(req, res) {
        const userid = req.params.userid;
        con.query(
            'SELECT discord_topdesign.id AS id, discord_topdesign.timeshort ' +
            'AS timeshort FROM discord_topdesign, discord_topdesign_likes ' +
            'WHERE discord_topdesign_likes.postid = discord_topdesign.id ' +
            'AND discord_topdesign_likes.userid = ?',
            [userid],
            function (error, results) {
                if (error) {
                    throw error;
                }
                let grouped = groupBy(results, 'timeshort');
                if (!grouped || results.length < 1) {
                    return Re.not_found(res);
                }
                Re.success(res, grouped);
            }
        );
    }

    export async function submissions(req, res) {
        const userid = req.params.userid;
        con.query(
            'SELECT designs.id, designs.timeshort, designs.username, designs.avatar, designs.userid, designs.image,' +
            ' COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ' +
            'ON designs.id = likes.postid WHERE designs.userid = ?',
            [userid],
            function (error, results) {
                if (error) {
                    throw error;
                }
                let grouped = groupBy(results, 'timeshort');
                if (grouped.null) {
                    return Re.not_found(res);
                }
                Re.success(res, grouped);
            }
        );
    }
}
export = Votes;
