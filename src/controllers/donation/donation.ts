import {getConnection} from '../../services/connection';
import * as Re from '../../services/response';

const con = getConnection();
module Donation {

    export async function addDonation(req, res) {
        const body = req.body;
        con.query('INSERT INTO discord_donations SET ?', [body], function (error) {
            if (error) { throw error; }
            return Re.success(res, {action: 'add'});
        });
    }

    export async function findAllDonations(req, res) {
        con.query('SELECT * FROM discord_donations', (error, results) => {
            if (error) { throw error; }
            return Re.success(res, results);
        });
    }
}
export = Donation;
