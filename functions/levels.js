const con = require('./Connection').getConnection()

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
    if (!results) return res.status(404).send('Not found')
    res.json(results)
  })
}
exports.addXP = async function (req, res) {
  const userid = req.params.userid
  if (userid.length > 18) return res.status(400).json({error: 'userid can only be 18 characters long'})
  const body = req.body
  if (!body) return res.status(400).json({error: 'body required'})

  const needed = ['username', 'avatar', 'xp', 'discriminator']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      res.status(400)
      res.json({error: 'Proberty ' + needed[i] + ' required'})
      return
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
      const newXP = results[0].xp
      res.json({
        action: 'add',
        oldXP: newXP - body.xp,
        newXP: newXP
      })
    })
  })
}
exports.deleteXP = async function (req, res) {
  const userid = req.params.userid
  if (userid.length > 18) return res.status(400).json({error: 'userid can only be 18 characters long'})
  const body = req.body
  if (!body) return res.status(400).json({error: 'body required'})

  const needed = ['username', 'avatar', 'xp', 'discriminator']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      res.status(400)
      res.json({error: 'Proberty ' + needed[i] + ' required'})
      return
    }
  }
  con.query('SELECT xp FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
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
        return res.json({error: 'user has not enough xp'})
      })
    } else if (xp.cp >= body.xp) {
      con.query('UPDATE discord_levels SET xp = xp - ? WHERE userid = ?', [body.xp, userid], function (error) {
        if (error) throw error
        res.json({
          action: 'delete'
        })
      })
    } else {
      // USER has not enough XP
      res.json({
        error: 'user has not enough xp'
      })
    }
  })
}
exports.addChests = async function (req, res) {
  const userid = req.params.userid
  if (userid.length > 18) return res.status(400).json({error: 'userid can only be 18 characters long'})
  const body = req.body
  if (!body) return res.status(400).json({error: 'body required'})

  const needed = ['username', 'avatar', 'chests', 'discriminator']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      res.status(400)
      res.json({error: 'Proberty ' + needed[i] + ' required'})
      return
    }
  }
  con.query('UPDATE discord_levels SET chests = chests + ? WHERE userid = ?', [body.chests, userid], function (error, results) {
    if (error) throw error
    if (!results.affectedRows === 1) {
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
  if (userid.length > 18) return res.status(400).json({error: 'userid can only be 18 characters long'})

  const body = req.body
  if (!body) return res.status(400).json({error: 'body required'})

  const needed = ['username', 'avatar', 'chests', 'discriminator']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) return res.status(400).json({error: 'Proberty ' + needed[i] + ' required'})
  }

  con.query('SELECT chests FROM discord_levels WHERE userid = ?', [userid], function (error, results) {
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
        return res.json({error: 'user has not enough chests'})
      })
    } else if (chests.chests >= body.chests) {
      con.query('UPDATE discord_levels SET chests = chests - ? WHERE userid = ?', [body.chests, userid], function (error) {
        if (error) throw error
        res.json({
          action: 'delete'
        })
      })
    } else {
      // USER has not enough CHESTS
      res.json({
        error: 'user has not enough chests'
      })
    }
  })
}
