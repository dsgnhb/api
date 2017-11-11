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
     * @apiError body_missing Request Body is missing (500 code for some reason)
     * @apiError property_required Property name required (400 for some reason)
     *
     */
    export async function addDonation(req, res) {
        const body: Body = req.body;
        if (!req.body) { return Re.body_missing(res); }

        const needed: Array<string> = ['ip', 'code', 'name'];
        needed.some((property) => {
                if (!req.body.hasOwnProperty(property)) {
                    Re.property_required(res, property);
                    return true;
                }
            });
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
            Re.success(res, results);
        });
    }
}
export = Donation;
