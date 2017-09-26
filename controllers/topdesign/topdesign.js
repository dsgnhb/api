const f = require('../../helpers/functions.js')
const con = require('../../helpers/Connection').getConnection()
const Response = require('../../helpers/response-helper')
const votes = require('votes')

exports.findAll = function (req, res) {
  // Return all Posts
  con.query('SELECT designs.id, designs.username, designs.avatar, designs.userid, designs.image, COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.active = 1 GROUP BY designs.id ORDER BY likes DESC', function (error, results) {
    if (error) throw error
    Response.success(res, results)
  })
}
exports.findAllCurrentMonth = function (req, res) {
  // Return all Posts from current month
  const timeshort = f.timeshort(new Date())
  con.query('SELECT designs.id, designs.username, designs.avatar, designs.userid, designs.image, COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.active = 1 AND timeshort = ? GROUP BY designs.id ORDER BY likes DESC', [timeshort], function (error, results) {
    if (error) throw error
    Response.success(res, results)
  })
}
exports.findAllMonth = function (req, res) {
  // Return all Posts grouped by month
  con.query('SELECT designs.id, designs.timeshort, designs.username, designs.avatar, designs.userid, designs.image, ' +
    'COUNT(likes.postid) AS likes FROM discord_topdesign AS designs ' +
    'LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.active = 1 ' +
    'GROUP BY designs.id ' +
    'ORDER BY designs.timeshort DESC, likes DESC', function (error, results) {
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
  })
}
exports.findById = function (req, res) {
  const id = req.params.id
  con.query('SELECT designs.id, designs.timeshort, designs.username, designs.avatar, designs.userid, designs.image, COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.id = ?', [id], function (error, results) {
    if (error) throw error
    results = results[0]
    if (!results.id) {
      Response.not_found(404)
    } else {
      Response.success(res, results)
    }
  })
}
exports.add = async (req, res) => {
  const body = req.body
  if (!req.body) return Response.body_missing(res)

  const needed = ['username', 'userid', 'avatar', 'content', 'image']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      return Response.body_missing(res)
    }
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
    Response.success(res, {action: 'add', postid: results.insertId})
  })
}
exports.changeStatus = async function (req, res) {
  const postid = req.params.id
  con.query('SELECT designs.active, designs.username,  COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.id = ? GROUP BY designs.id ORDER BY likes DESC', [postid], function (error, results) {
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
  })
}
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
