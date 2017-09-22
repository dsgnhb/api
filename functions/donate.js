const con = require('./Connection').getConnection()

exports.add = async (req, res) => {
  const body = req.body
  if (!req.body) return res.sendStatus(400)

  const needed = ['ip', 'code', 'name']
  for (let i = 0; i < needed.length; i++) {
    if (!body.hasOwnProperty(needed[i])) {
      res.status(400)
      res.json({error: 'Proberty ' + needed[i] + ' required'})
      return
    }
  }
  con.query('INSERT INTO discord_donations SET ?', [body], function (error) {
    if (error) throw error
    res.json({action: 'add'})
  })
}
