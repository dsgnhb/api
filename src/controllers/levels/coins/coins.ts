import * as Re from '../../../services/response';
import {getConnection} from '../../../services/connection';

const con = getConnection();
module Coins {
    /**
     * @api {post} /levels/coins/:userid Add Coins
     * @apiVersion 1.2.1
     * @apiName AddCoins
     * @apiDescription Add Coins
     * @apiGroup Levels
     *
     * @apiParam {String} username
     * @apiParam {Object} avatar
     * @apiParam {Number} coins
     * @apiParam {Object} discriminator
     *
     * @apiSuccess (200) {Object} result
     * @apiSuccess (200) {String} result.action
     * @apiSuccess (200) {Number} result.oldCoins
     * @apiSuccess (200) {Number} result.newCoins
     *
     * @apiSuccessExample {json} Success-Example:
     *     HTTP/1.1 200
     *     {
     *        "action": "add",
     *        "oldCoins": 3
     *        "newCoins": 5
     *     }
     *
     *
     */

    export async function addCoin (req, res) {
        const userid = req.params.userid;
        if (userid.length > 18) { return Re.userid_too_long(res); }
        const body = req.body;
        if (!body) { return Re.body_missing(res); }

        const needed = ['username', 'avatar', 'coins', 'discriminator'];
        for (let i = 0; i < needed.length; i++) {
            if (!body.hasOwnProperty(needed[i])) {
                return Re.property_required(res, needed[i]);
            }
        }
        con.query('UPDATE discord_levels SET coins = coins + ? WHERE userid = ?', [body.coins, userid], function (error, results) {
            if (error) { throw error; }
            if (results.changedRows === 0) {
                let data = {
                    userid: userid,
                    username: body.username,
                    discriminator: body.discriminator,
                    avatar: body.avatar,
                    xp: 0,
                    chests: 0,
                    coins: 100 + body.coins
                };
                con.query('INSERT INTO discord_levels SET ?', [data], function (error) {
                    if (error) { throw error; }
                });
            }
            con.query('SELECT coins FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
                if (error) { throw error; }
                const newCoins = results[0].coins;
                res.json({
                    action: 'add',
                    oldCoins: newCoins - body.coins,
                    newCoins: newCoins
                });
            });
        });
    }
    /**
     * @api {delete} /levels/coins/:userid Delete Coins
     * @apiVersion 1.2.1
     * @apiName DeleteCoins
     * @apiDescription Delete coins
     * @apiGroup Levels
     *
     * @apiParam {String} username
     * @apiParam {Object} avatar
     * @apiParam {Number} coins
     * @apiParam {Object} discriminator
     *
     * @apiSuccess (200) {Object} result
     * @apiSuccess (200) {String} result.action
     *
     * @apiSuccessExample {json} Success-Example (code 200 for some reason XD):
     *     HTTP/1.1 200
     *     {
     *        "action": "delete"
     *     }
     *
     * @apiError userid_too_long Userid can only be 18 characters long (500 code for some reason)
     * @apiError not_sufficientv User has not enough coins (500 for some reason)
     * @apiError body_missing Request Body is missing (500 code for some reason)
     * @apiError property_required Property name required (400 for some reason)
     *
     */
    export async function deleteCoin (req, res) {
        const userid = req.params.userid;
        if (userid.length > 18) { return Re.userid_too_long(res); }

        const body = req.body;
        if (!body) { return Re.body_missing(res); }

        const needed = ['username', 'avatar', 'coins', 'discriminator'];
        for (let i = 0; i < needed.length; i++) {
            if (!body.hasOwnProperty(needed[i])) { return Re.property_required(res, needed[i]); }
        }

        con.query('SELECT coins FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
            if (error) { throw error; }
            const coins = results[0];
            if (!coins) {
                // USER isn't in DB yet
                let data = {
                    userid: userid,
                    username: body.username,
                    discriminator: body.discriminator,
                    avatar: body.avatar,
                    xp: 0,
                    chests: 0,
                    coins: 100
                };
                con.query('INSERT INTO discord_levels SET ?', [data], function (error) {
                    if (error) { throw error; }
                    return Re.not_sufficient(res, 'coins');
                });
            } else if (coins.coins >= body.coins) {
                con.query('UPDATE discord_levels SET coins = coins - ? WHERE userid = ?', [body.coins, userid], function (error) {
                    if (error) { throw error; }
                    Re.success(res, {
                        action: 'remove',
                        oldCoins: coins.coins,
                        newCoins: coins.coins - body.coins
                    });
                });
            } else {
                // USER has not enough COINS
                Re.not_sufficient(res, 'coins');
            }
        });
    }

}
export = Coins;
