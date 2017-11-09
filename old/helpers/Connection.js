const mysql = require('mysql')
const config = require('../config.json')

let con
module.exports = {
  // This is a singleton: Only one instance will be created and returned.
  getConnection: function () {
    let self = this
    if (con) return con
    con = mysql.createPool({
      connectionLimit: 10,
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database,
      debug: false
    })
    // - Error listener
    con.on('error', function (err) {
      // - The server close the connection.
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('/!\\ Cannot establish a connection with the database. /!\\ (' + err.code + ')')
        console.log(err)
        self.getConnection()
      } else if (err.code === 'PROTOCOL_ENQUEUE_AFTER_QUIT') {
        // - Connection in closing
        console.log('/!\\ Cannot establish a connection with the database. /!\\ (' + err.code + ')')
        console.log(err)
        self.getConnection()
      } else if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
        // - Fatal error : connection variable must be recreated
        console.log('/!\\ Cannot establish a connection with the database. /!\\ (' + err.code + ')')
        console.log(err)
        self.getConnection()
      } else if (err.code === 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE') {
        // - Error because a connection is already being established
        console.log('/!\\ Cannot establish a connection with the database. /!\\ (' + err.code + ')')
        console.log(err)
      } else {
         // - Anything else
        console.log('/!\\ Cannot establish a connection with the database. /!\\ (' + err.code + ')')
        console.log(err)
        self.getConnection()
      }
    })
    return con
  }
}
