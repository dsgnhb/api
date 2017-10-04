const con = require('../../helpers/Connection').getConnection()
const Response = require('../../helpers/response-helper')

  /**
   * @api {get} /donate Add Donation
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
exports.add = async (req, res) => {
  const body = req.body
  if (!req.body) return Response.body_missing(res)

  const needed = ['ip', 'code', 'name']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      return Response.property_required(res, needed[i])
    }
  }
  con.query('INSERT INTO discord_donations SET ?', [body], function (error) {
    if (error) throw error
    return Response.success(res, {action: 'add'})
  })
}
