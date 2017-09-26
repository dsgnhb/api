const con = require('../../helpers/Connection').getConnection()
const Response = require('../../helpers/response-helper')

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
