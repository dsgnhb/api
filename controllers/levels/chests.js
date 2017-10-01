const con = require('../../helpers/Connection').getConnection()
const Response = require('../../helpers/response-helper')
exports.addChests = async function (req, res) {
  const userid = req.params.userid
  if (userid.length > 18) return Response.userid_too_long(res)
  const body = req.body
  if (!body) return Response.body_missing(res)

  const needed = ['username', 'avatar', 'chests', 'discriminator']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      return Response.property_required(res, needed[i])
    }
  }
  con.query('UPDATE discord_levels SET chests = chests + ? WHERE userid = ?', [body.chests, userid], function (error, results) {
    if (error) throw error
    if (results.changedRows === 0) {
      let data = {
        userid: userid,
        username: body.username,
        discriminator: body.discriminator,
        avatar: body.avatar,
        xp: 0,
        chests: body.chests
      }
      con.query('INSERT INTO discord_levels SET ?', [data], function (error) {
        if (error) throw error
      })
    }
    con.query('SELECT chests FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
      if (error) throw error
      const newChests = results[0].chests
      res.json({
        action: 'add',
        oldChests: newChests - body.chests,
        newChests: newChests
      })
    })
  })
}
exports.deleteChests = async function (req, res) {
  const userid = req.params.userid
  if (userid.length > 18) return Response.userid_too_long(res)

  const body = req.body
  if (!body) return Response.body_missing(res)

  const needed = ['username', 'avatar', 'chests', 'discriminator']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) return Response.property_required(res, needed[i])
  }

  con.query('SELECT chests FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
    if (error) throw error
    const chests = results[0]
    if (!chests) {
      // USER isn't in DB yet
      let data = {
        userid: userid,
        username: body.username,
        discriminator: body.discriminator,
        avatar: body.avatar,
        xp: 0,
        chests: 0
      }
      con.query('INSERT INTO discord_levels SET ?', [data], function (error) {
        if (error) throw error
        return Response.not_sufficient(res, 'chests')
      })
    } else if (chests.chests >= body.chests) {
      con.query('UPDATE discord_levels SET chests = chests - ? WHERE userid = ?', [body.chests, userid], function (error) {
        if (error) throw error
        Response.success(res, {
          action: 'delete'
        })
      })
    } else {
      // USER has not enough CHESTS
      Response.not_sufficient(res, 'chests')
    }
  })
}
