import {getConnection} from '../../services/connection';
import * as Re from '../../services/response';

const con = getConnection();
module Donation {
    /**
     * @api {post} /donate Add Donation
     * @apiVersion 1.2.2
     * @apiName AddDonation
     * @apiDescription Add Donation
     * @apiGroup Donation
     *
     * @apiParam {Object} ip Something that called ip
     * @apiParam {Object} code Something
     * @apiParam {Object} name Something
     *
     * @apiSuccess (200) {Object} result
     * @apiSuccess (200) {String} result.action
     *
     * @apiSuccessExample {json} Success-Example:
     *     HTTP/1.1 200
     *     {
     *        "action": "add"
     *     }
     *
     *
     */
    export async function addDonation(req, res) {
        const body = req.body;
        con.query('INSERT INTO discord_donations SET ?', [body], function (error) {
            if (error) { throw error; }
            return Re.success(res, {action: 'add'});
        });
    }

    /**
     * @api {get} /donate Get all Donations
     * @apiVersion 1.5.0
     * @apiName GetAllDonations
     * @apiDescription Get all Donations
     * @apiGroup Donation
     *
     * @apiSuccess (200) {Object[]} results
     *
     */
    export async function findAllDonations(req, res) {
        con.query('SELECT * FROM discord_donations', (error, results) => {
            if (error) { throw error; }
            return Re.success(res, results);
        });
    }
}
export = Donation;
