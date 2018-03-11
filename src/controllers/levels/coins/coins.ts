import * as Re from '../../../services/response';
import {getConnection} from '../../../services/connection';

const con = getConnection();
module Coins {

    export async function addCoin (req, res) {
        const userid = req.params.userid;

        const body = req.body;

        con.query('UPDATE discord_levels SET coins = coins + ? WHERE userid = ?', [body.coins, userid], function (error, results) {
            if (error) { throw error; }
            if (results.changedRows === 0) {

                con.query('INSERT INTO discord_levels SET ?', [{
                    userid: userid,
                    username: body.username,
                    discriminator: body.discriminator,
                    avatar: body.avatar,
                    xp: 0,
                    chests: 0,
                    coins: 100 + body.coins
                }],       error => {
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

    export async function removeCoin (req, res) {
        const userid = req.params.userid;

        const body = req.body;

        con.query('SELECT coins FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
            if (error) { throw error; }
            const coins = results[0];
            if (!coins) {
                con.query('INSERT INTO discord_levels SET ?', [{
                    userid: userid,
                    username: body.username,
                    discriminator: body.discriminator,
                    avatar: body.avatar,
                    xp: 0,
                    chests: 0,
                    coins: 100
                }],       error => {
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
