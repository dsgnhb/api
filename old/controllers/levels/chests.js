const con = require('../../helpers/Connection').getConnection()
const Response = require('../../helpers/response-helper')

/**
   * @api {post} /levels/chests/:userid Add Chests
   * @apiVersion 1.2.2
   * @apiName AddChests
   * @apiDescription Add Chests
   * @apiGroup Levels
   *
   * @apiParam {String} username
   * @apiParam {Object} avatar
   * @apiParam {Number} chests
   * @apiParam {Object} discriminator
   *
   * @apiSuccess (200) {Object} result
   * @apiSuccess (200) {String} result.action
   * @apiSuccess (200) {Number} result.oldChests
   * @apiSuccess (200) {Number} result.newChests
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 200
   *     {
   *        "action": "add",
   *        "oldChests": 3
   *        "newChests": 5
   *     }
   *
   * @apiError userid_too_long Userid can only be 18 characters long (500 code for some reason)
   * @apiError body_missing Request Body is missing (500 code for some reason)
   * @apiError property_required Property name required (400 for some reason)
   *
   */

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
        chests: body.chests,
        coins: 100
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

/**
   * @api {delete} /levels/chests/:userid Delete Chests
   * @apiVersion 1.2.2
   * @apiName DeleteChests
   * @apiDescription Delete Chests
   * @apiGroup Levels
   *
   * @apiParam {String} username
   * @apiParam {Object} avatar
   * @apiParam {Number} chests
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
   * @apiError not_sufficientv User has not enough chests (500 for some reason)
   * @apiError body_missing Request Body is missing (500 code for some reason)
   * @apiError property_required Property name required (400 for some reason)
   *
   */
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
        chests: 0,
        coins: 100
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
