const Response = require('../../helpers/response-helper')
const f = require('../../helpers/functions')
const con = require('../../helpers/Connection').getConnection()
exports.vote = function (req, res) {
  const postid = req.params.postid
  const body = req.body
  if (!body) return Response.body_missing(res)

  const needed = ['userid']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      return Response.property_required(res, needed[i])
    }
  }
  const timeshort = f.timeshort(new Date())
  con.query('SELECT designs.id, designs.username, COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.active = 1 AND timeshort = ? AND designs.id = ? GROUP BY designs.id ORDER BY likes DESC', [timeshort, postid], function (error, results) {
    if (error) throw error
    let post = results[0]
    if (!post) return Response.not_found(404)
    con.query('DELETE FROM discord_topdesign_likes WHERE postid = ? AND userid = ?', [postid, body.userid], function (error, results) {
      if (error) throw error
      if (results.affectedRows === 0) {
        let data = {
          userid: body.userid,
          postid: postid
        }
        con.query('INSERT INTO discord_topdesign_likes SET ?', [data], function (error) {
          if (error) throw error
          Response.success(res, {
            action: 'add',
            likes: post.likes + 1,
            posted_by: post.username
          })
        })
      } else {
        Response.success(res, {
          action: 'remove',
          likes: post.likes - 1,
          posted_by: post.username
        })
      }
    })
  })
}
exports.voted = function (req, res) {
  const userid = req.params.userid
  con.query('SELECT discord_topdesign.id AS id, discord_topdesign.timeshort AS timeshort FROM discord_topdesign, discord_topdesign_likes WHERE discord_topdesign_likes.postid = discord_topdesign.id AND discord_topdesign_likes.userid = ?', [userid], function (error, results) {
    if (error) throw error
    let grouped = f.groupBy(results, 'timeshort')
    if (!grouped || results.length < 1) return Response.not_found(res)
    Response.success(res, grouped)
  })
}
exports.submissions = function (req, res) {
  const userid = req.params.userid
  con.query('SELECT designs.id, designs.timeshort, designs.username, designs.avatar, designs.userid, designs.image, COUNT(likes.postid) AS likes FROM discord_topdesign AS designs LEFT JOIN discord_topdesign_likes AS likes ON designs.id = likes.postid WHERE designs.userid = ?', [userid], function (error, results) {
    if (error) throw error
    let grouped = f.groupBy(results, 'timeshort')
    if (grouped.null) return Response.not_found(res)
    Response.success(res, grouped)
  })
}
