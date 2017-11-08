const f = require('../../helpers/functions.js')
const con = require('../../helpers/Connection').getConnection()
const Response = require('../../helpers/response-helper')
const votes = require('./votes')

/**
   * @api {get} /topdesign/posts Get all posts
   * @apiVersion 1.2.2
   * @apiName GetAllPosts
   * @apiDescription Get all Posts
   * @apiGroup Posts
   *
   * @apiSuccess (200) {Object[]} results
   *
   */

exports.findAll = function (req, res) {
  // Return all Posts
  con.query(
    'SELECT designs.id, designs.username, designs.avatar, designs.userid, designs.image, COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.active = 1 GROUP BY designs.id ORDER BY likes DESC',
    function (error, results) {
      if (error) throw error
      Response.success(res, results)
    }
  )
}

/**
   * @api {get} /topdesign/posts/currentmonth Get all Posts for current Month
   * @apiVersion 1.2.2
   * @apiName GetAllPostsCurrMonth
   * @apiDescription Get all Posts for current Month (query params??)
   * @apiGroup Posts
   *
   * @apiSuccess (200) {Object[]} results
   *
   */
exports.findAllCurrentMonth = function (req, res) {
  // Return all Posts from current month
  const timeshort = f.timeshort(new Date())
  con.query(
    'SELECT designs.id, designs.username, designs.avatar, designs.userid, designs.image, COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.active = 1 AND timeshort = ? GROUP BY designs.id ORDER BY likes DESC',
    [timeshort],
    function (error, results) {
      if (error) throw error
      Response.success(res, results)
    }
  )
}

/**
   * @api {get} /topdesign/posts/month  Get all Posts sorted by Month
   * @apiVersion 1.2.2
   * @apiName GetAllPostsByMonth
   * @apiDescription Return all Posts grouped by month
   * @apiGroup Posts
   *
   * @apiSuccess (200) {Object[]} results
   *
   */
exports.findAllMonth = function (req, res) {
  // Return all Posts grouped by month
  con.query(
    'SELECT designs.id, designs.timeshort, designs.username, designs.avatar, designs.userid, designs.image, ' +
      'COUNT(likes.postid) AS likes FROM discord_topdesign AS designs ' +
      'LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.active = 1 ' +
      'GROUP BY designs.id ' +
      'ORDER BY designs.timeshort DESC, likes DESC',
    function (error, results) {
      if (error) throw error
      let grouped = f.groupBy(results, 'timeshort')
      for (let key in grouped) {
        if (grouped.hasOwnProperty(key)) {
          for (let i = 0; i < grouped[key].length; i++) {
            grouped[key][i].winner = false
          }
          grouped[key][0].winner = true
        }
      }
      Response.success(res, grouped)
    }
  )
}

/**
   * @api {get} /topdesign/posts/:id  Get Post by Id
   * @apiVersion 1.2.2
   * @apiName GetById
   * @apiDescription Get Post by Id
   * @apiGroup Posts
   *
   * @apiSuccess (200) {Object} result
   *
   * @apiError not_found Not found (404)
   *
   */
exports.findById = function (req, res) {
  const id = req.params.id
  con.query(
    'SELECT designs.id, designs.timeshort, designs.username, designs.avatar, designs.userid, designs.image, designs.active, COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.id = ?',
    [id],
    function (error, results) {
      if (error) throw error
      results = results[0]
      if (!results.id) {
        Response.not_found(res)
      } else {
        Response.success(res, results)
      }
    }
  )
}

// noinspection RedundantIfStatementJS
function findbyUserIDandTime (userid) {
  return new Promise((resolve, reject) => {
    const timeshort = f.timeshort(new Date())
    con.query('SELECT discord_topdesign.id FROM discord_topdesign WHERE discord_topdesign.userid = ? AND discord_topdesign.timeshort = ?', [userid, timeshort], function (error, results) {
      if (error) throw error
      if (results.length === 0) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

/**
   * @api {post} /topdesign/posts/  Add Post
   * @apiVersion 1.2.2
   * @apiName AddPost
   * @apiDescription Add new post
   * @apiGroup Posts
   *
   * @apiParam {String} username
   * @apiParam {Number} userid
   * @apiParam {Object} avatar
   * @apiParam {Object} content
   * @apiParam {Object} image
   *
   * @apiSuccess (200) {Object} result
   * @apiSuccess (200) {String} result.action
   * @apiSuccess (200) {Number} result.postid
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 200
   *     {
   *        "action": "add",
   *        "postid": 3
   *     }
   *
   * @apiError body_missing Request Body is missing (500 code for some reason)
   * @apiError 408 {error: 'You already inserted the topdesign for this month.'}
   *
   */
exports.add = async (req, res) => {
  const body = req.body
  if (!req.body) return Response.body_missing(res)

  const needed = ['username', 'userid', 'avatar', 'content', 'image']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      return Response.body_missing(res)
    }
  }

  let exists = await findbyUserIDandTime(body.userid)
  if (exists) {
    return Response.already_existing(res)
  }

  let data = body
  let avatar = await f.imgur(body.avatar)
  let image = await f.imgur(body.image)
  let timeshort = f.timeshort(new Date())
  data.avatar = avatar
  data.image = image
  data.timeshort = timeshort
  con.query('INSERT INTO discord_topdesign SET ?', [data], function (error, results) {
    if (error) throw error
    Response.success(res, { action: 'add', postid: results.insertId })
  })
}

/**
   * @api {put} /topdesign/posts/:id Update Status of Post
   * @apiVersion 1.2.2
   * @apiName UpdatePost
   * @apiDescription Update Status of Post
   * @apiGroup Posts
   *
   *
   * @apiSuccess (200) {Object} result
   * @apiSuccess (200) {String="deactivate","activate"} result.action
   * @apiSuccess (200) {Number} result.likes
   * @apiSuccess (200) {String} result.username
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 200
   *     {
   *        "action": "deactivate",
   *        "likes": 3,
   *        "posted_by": "JohnDoe"
   *     }
   *
   * @apiError not_found Not found (404)
   *
   */
exports.changeStatus = async function (req, res) {
  const postid = req.params.id
  con.query(
    'SELECT designs.active, designs.username,  COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.id = ? GROUP BY designs.id ORDER BY likes DESC',
    [postid],
    function (error, results) {
      if (error) throw error
      let post = results[0]
      if (!post) return Response.not_found(res)
      switch (post.active) {
        case 1:
          con.query('UPDATE discord_topdesign SET active = 0 WHERE id = ?', [postid], function (error) {
            if (error) throw error
            Response.success(res, {
              action: 'deactivate',
              likes: post.likes,
              posted_by: post.username
            })
          })
          break
        case 0:
          con.query('UPDATE discord_topdesign SET active = 1 WHERE id = ?', [postid], function (error) {
            if (error) throw error
            Response.success(res, {
              action: 'activate',
              likes: post.likes,
              posted_by: post.username
            })
          })
          break
      }
    }
  )
}

/**
   * @api {delete} /topdesign/posts/:id Delete Post
   * @apiVersion 1.2.2
   * @apiName DeletePost
   * @apiDescription Delete Post
   * @apiGroup Posts
   *
   * @apiSuccess (200) {Object} result
   * @apiSuccess (200) {String} result.action
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 200
   *     {
   *        "action": "delete"
   *     }
   *
   * @apiError not_found Not found (404)
   *
   */
exports.delete = function (req, res) {
  const postid = req.params.id

  con.query('DELETE FROM discord_topdesign WHERE id=?', [postid], function (error, results) {
    if (error) throw error
    if (results.affectedRows === 0) return Response.not_found(res)
    Response.success(res, {
      action: 'delete'
    })
  })
}
exports.vote = votes.vote
exports.voted = votes.voted
exports.submissions = votes.submissions
