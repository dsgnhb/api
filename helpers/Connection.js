const mysql = require('mysql')
const config = require('../config.json')

let con
module.exports = {
  // This is a singleton: Only one instance will be created and returned.
  getConnection: function () {
    let self = this
    if (con) return con
    con = mysql.createConnection({
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database
    })
    // According to the Docs, the connection can be implicitly invoked by quering the database an catching the errors, which happens anyways. No need for the Error Callback here :)
    con.connect()
    con.on('error', function (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        self.getConnection()
      } else {
        throw err
      }
    })
    return con
  }
}
