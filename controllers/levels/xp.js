const con = require('../../helpers/Connection').getConnection()
const Response = require('../../helpers/response-helper')

/**
   * @api {post} /levels/xp/:userid  Add XP
   * @apiVersion 1.2.1
   * @apiName AddXP
   * @apiDescription Add xp (windows xp?)
   * @apiGroup Levels
   *
   * @apiParam {String} username
   * @apiParam {Object} avatar
   * @apiParam {Number} xp
   * @apiParam {Object} discriminator Seems like a number, but who cares
   *
   * @apiSuccess (200) {Object} result
   * @apiSuccess (200) {String} result.action
   * @apiSuccess (200) {Number} result.oldXP
   * @apiSuccess (200) {Number} result.newXP
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 200
   *     {
   *        "action": "add",
   *        "oldXP": 3
   *        "newXP": 5
   *     }
   *
   * @apiError userid_too_long Userid can only be 18 characters long (500 code for some reason)
   * @apiError body_missing Request Body is missing (500 code for some reason)
   * @apiError property_required Property name required (400 for some reason)
   *
   */

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
    if (results.changedRows === 0) {
      let data = {
        userid: userid,
        username: body.username,
        discriminator: body.discriminator,
        avatar: body.avatar,
        xp: body.xp,
        chests: 0,
        coins: 100
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

/**
   * @api {delete} /levels/xp/:userid Delete XP
   * @apiVersion 1.2.1
   * @apiName DeleteXP
   * @apiDescription Delete XP
   * @apiGroup Levels
   *
   * @apiParam {String} username
   * @apiParam {Object} avatar
   * @apiParam {Number} xp
   * @apiParam {Object} discriminator
   *
   * @apiSuccess (200) {Object} result
   * @apiSuccess (200) {String} result.action
   *
   * @apiSuccessExample {json} Success-Example (code 200 for some reason XD):
   *     HTTP/1.1 200
   *     {
   *        "action": "delete"
   *     }
   *
   * @apiError userid_too_long Userid can only be 18 characters long (500 code for some reason)
   * @apiError not_sufficientv User has not enough xp (500 for some reason)
   * @apiError body_missing Request Body is missing (500 code for some reason)
   * @apiError property_required Property name required (400 for some reason)
   *
   */
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
        chests: 0,
        coins: 100
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
