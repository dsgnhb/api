const con = require('../../helpers/Connection').getConnection()
const Response = require('../../helpers/response-helper')
exports.addXP = async function (req, res) {
  const userid = req.params.userid
  if (userid.length > 18) return Response.userid_too_long(res)
  const body = req.body
  if (!body) return Response.body_missing(res)

  const needed = ['username', 'avatar', 'xp', 'discriminator']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      return Response.property_required(res, needed[i])
    }
  }
  con.query('UPDATE discord_levels SET xp = xp + ? WHERE userid = ?', [body.xp, userid], function (error, results) {
    if (error) throw error
    if (!results.affectedRows === 1) {
      let data = {
        userid: userid,
        username: body.username,
        discriminator: body.discriminator,
        avatar: body.avatar,
        xp: body.xp,
        chests: 0
      }
      con.query('INSERT INTO discord_levels SET ?', [data], function (error) {
        if (error) throw error
      })
    }
    con.query('SELECT xp FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
      if (error) throw error
      const newXP = results[0].xp
      Response.success(res, {
        action: 'add',
        oldXP: newXP - body.xp,
        newXP: newXP
      })
    })
  })
}
exports.deleteXP = async function (req, res) {
  const userid = req.params.userid
  if (userid.length > 18) return Response.userid_too_long(res)
  const body = req.body
  if (!body) return Response.body_missing(res)

  const needed = ['username', 'avatar', 'xp', 'discriminator']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      return Response.property_required(res, needed[i])
    }
  }
  con.query('SELECT xp FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
    if (error) throw error
    const xp = results[0]
    if (!xp) {
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
        return Response.not_sufficient(res, 'xp')
      })
    } else if (xp.cp >= body.xp) {
      con.query('UPDATE discord_levels SET xp = xp - ? WHERE userid = ?', [body.xp, userid], function (error) {
        if (error) throw error
        Response.success(res, {
          action: 'delete'
        })
      })
    } else {
      // USER has not enough XP
      return Response.not_sufficient(res, 'xp')
    }
  })
}
