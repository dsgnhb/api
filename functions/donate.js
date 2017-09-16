const mysql = require('mysql');
const config = require("../config.json")
const f = require("./functions.js")

const db_config = {
    host : config.mysql.host,
    user : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database,
};
var con;
function handleDisconnect() {
    con = mysql.createConnection(db_config);
    con.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });
    con.on('error', function(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();

exports.add = async (req, res) => {
    const body = req.body
    if (!req.body) return res.sendStatus(400)

    const needed = ["ip", "code", "name"]
    for (var i = 0; i < needed.length; i++) {
        if(!body.hasOwnProperty(needed[i])) {
            res.status(400)
            res.json({error : "Proberty "+needed[i]+" required"});
            return;
        }
    }
    let data = body;
    con.query('INSERT INTO discord_donations SET ?', [data], function (error, results, fields) {
        if (error) throw error;
        res.json({action : "add"})
    });
}