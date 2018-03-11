import * as Re from '../../../services/response';
import {getConnection} from '../../../services/connection';

const con = getConnection();
module XP {

   export async function addXP (req, res) {
        const userid = req.params.userid;

        const body = req.body;

        con.query('UPDATE discord_levels SET xp = xp + ? WHERE userid = ?', [body.xp, userid], function (error, results) {
            if (error) { throw error; }
            if (results.changedRows === 0) {
                con.query('INSERT INTO discord_levels SET ?', [{
                    userid: userid,
                    username: body.username,
                    discriminator: body.discriminator,
                    avatar: body.avatar,
                    xp: body.xp,
                    chests: 0,
                    coins: 100
                }], function (error) {
                    if (error) { throw error; }
                });
            }
            con.query('SELECT xp FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
                if (error) { throw error; }
                const newXP = results[0].xp;
                Re.success(res, {
                    action: 'add',
                    oldXP: newXP - body.xp,
                    newXP: newXP
                });
            });
        });
    }

   export async function removeXP (req, res) {
        const userid = req.params.userid;

        const body = req.body;

        con.query('SELECT xp FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
            if (error) { throw error; }
            const xp = results[0];
            if (!xp) {
                // USER isn't in DB yet
                con.query('INSERT INTO discord_levels SET ?', [{
                    userid: userid,
                    username: body.username,
                    discriminator: body.discriminator,
                    avatar: body.avatar,
                    xp: 0,
                    chests: 0,
                    coins: 100
                }], function (error) {
                    if (error) { throw error; }
                    return Re.not_sufficient(res, 'xp');
                });
            } else if (xp.xp >= body.xp) {
                con.query('UPDATE discord_levels SET xp = xp - ? WHERE userid = ?', [body.xp, userid], function (error) {
                    if (error) { throw error; }
                    Re.success(res, {
                        action: 'remove',
                        oldXP: xp.xp,
                        newXP: xp.xp - body.xp
                    });
                });
            } else {
                // USER has not enough XP
                return Re.not_sufficient(res, 'xp');
            }
        });
    }
}
export = XP;
