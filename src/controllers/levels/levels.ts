import * as Re from '../../services/response';
import {getConnection} from '../../services/connection';

const con = getConnection();
module Levels {

    export async function findAllLevels (req, res) {
        con.query('SELECT userid, username, discriminator, avatar, xp, chests, coins' +
            ' FROM discord_levels ORDER BY xp DESC',
                  function (error, results) {
            if (error) { throw error; }
            for (let i = 0; i < results.length; i++) {
                let element = results[i];
                element.rank = i + 1;
            }
            res.json(results);
        });
    }

    export async function findLevelbyID (req, res) {
        const userid = req.params.userid;
        con.query(
            'SELECT userid,  username, discriminator, avatar, xp, chests, coins,' +
            ' (SELECT COUNT(id) FROM discord_levels as dc_levels WHERE dc_levels.xp >= levels.xp)' +
            ' AS rank FROM discord_levels as levels WHERE userid = ?',
            [userid],
            function (error, results) {
                if (error) { throw error; }
                results = results[0];
                if (!results) { return Re.not_found(res); }
                Re.success(res, results);
            }
        );
    }
}
export = Levels;
