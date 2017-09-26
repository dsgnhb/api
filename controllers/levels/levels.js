const con = require('../../helpers/Connection').getConnection()
const xp = require('./xp')
const chests = require('./chests')
const Response = require('../../helpers/response-helper')

exports.findAll = async function (req, res) {
  con.query('SELECT userid, username, discriminator, avatar, xp, chests FROM discord_levels ORDER BY xp DESC', function (error, results) {
    if (error) throw error
    for (let i = 0; i < results.length; i++) {
      const element = results[i]
      element.rank = i + 1
    }
    res.json(results)
  })
}
exports.findById = async function (req, res) {
  const userid = req.params.userid
  con.query('SELECT username, discriminator, avatar, xp, chests, (SELECT COUNT(id) FROM discord_levels as dc_levels WHERE dc_levels.xp >= levels.xp) AS rank FROM discord_levels as levels WHERE userid = ?', [userid], function (error, results) {
    if (error) throw error
    results = results[0]
    if (!results) return Response.not_found(res)
    Response.success(res, results)
  })
}
exports.addXP = xp.addXP
exports.deleteXP = xp.deleteXP
exports.addChests = chests.addChests
exports.deleteChests = chests.deleteChests
