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

exports.findAll = async function(req, res) {
    con.query('SELECT userid, username, avatar, xp, chests FROM discord_levels ORDER BY xp DESC', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
}
exports.findById = async function(req, res) {
    const userid = req.params.userid
    con.query('SELECT username, avatar, xp, chests FROM discord_levels WHERE userid = ?', [userid], function (error, results, fields) {
        if (error) throw error;
        results = results[0]
        if(!results) return res.status(404).send('Not found');
        res.json(results);
    });
}
exports.addXP = async function(req, res) {
    const userid = req.params.userid
    if(userid.length > 18) return res.status(400).json({error : "userid can only be 18 characters long"});
    const body = req.body
    if (!body) return res.status(400).json({error : "body required"});

    const needed = ["username", "avatar", "xp"];
    for (var i = 0; i < needed.length; i++) {
        if(!body.hasOwnProperty(needed[i])) {
            res.status(400)
            res.json({error : "Proberty "+needed[i]+" required"});
            return;
        }
    }
    con.query('UPDATE discord_levels SET xp = xp + ? WHERE userid = ?', [body.xp, userid], function (error, results, fields) {
        if (error) throw error;
        if(!results.affectedRows == 1) {
            let data = {
                userid : userid,
                username : body.username,
                avatar : body.avatar,
                xp : body.xp,
                chests : 0
            };
            con.query('INSERT INTO discord_levels SET ?', [data], function (error, results, fields) {
                if (error) throw error;
            });
        }
        con.query('SELECT xp FROM discord_levels WHERE userid = ?', [userid], function (error, results, fields) {
            const newXP = results[0].xp
            res.json({
                action : "add",
                oldXP : newXP-body.xp,
                newXP : newXP
            })
        });
    });
}
exports.deleteXP = async function(req, res) {
    const userid = req.params.userid
    if(userid.length > 18) return res.status(400).json({error : "userid can only be 18 characters long"});
    const body = req.body
    if (!body) return res.status(400).json({error : "body required"});

    const needed = ["username", "avatar", "xp"];
    for (var i = 0; i < needed.length; i++) {
        if(!body.hasOwnProperty(needed[i])) {
            res.status(400)
            res.json({error : "Proberty "+needed[i]+" required"});
            return;
        }
    }
    con.query('SELECT xp FROM discord_levels WHERE userid = ?', [userid], function (error, results, fields) {
        const xp = results[0];
        if(!xp) {
            // USER isn't in DB yet
            let data = {
                userid : userid,
                username : body.username,
                avatar : body.avatar,
                xp : 0,
                chests : 0
            };
            con.query('INSERT INTO discord_levels SET ?', [data], function (error, results, fields) {
                if (error) throw error;
                return res.json({ error : "user has not enough xp" });
            });
        } else if(xp.cp >= body.xp) {
            con.query('UPDATE discord_levels SET xp = xp - ? WHERE userid = ?', [body.xp, userid], function (error, results, fields) {
                if (error) throw error;
                res.json({
                    action : "delete"
                })
            });
        } else {
            // USER has not enough XP
            res.json({
                error : "user has not enough xp"
            })
        }
    });
}
exports.addChests = async function(req, res) {
    const userid = req.params.userid
    if(userid.length > 18) return res.status(400).json({error : "userid can only be 18 characters long"});
    const body = req.body
    if (!body) return res.status(400).json({error : "body required"});

    const needed = ["username", "avatar", "chests"];
    for (var i = 0; i < needed.length; i++) {
        if(!body.hasOwnProperty(needed[i])) {
            res.status(400)
            res.json({error : "Proberty "+needed[i]+" required"});
            return;
        }
    }
    con.query('UPDATE discord_levels SET chests = chests + ? WHERE userid = ?', [body.chests, userid], function (error, results, fields) {
        if (error) throw error;
        if(!results.affectedRows == 1) {
            let data = {
                userid : userid,
                username : body.username,
                avatar : body.avatar,
                xp : 0,
                chests : body.chests
            };
            con.query('INSERT INTO discord_levels SET ?', [data], function (error, results, fields) {
                if (error) throw error;
            });
        }
        con.query('SELECT chests FROM discord_levels WHERE userid = ?', [userid], function (error, results, fields) {
            const newChests = results[0].chests
            res.json({
                action : "add",
                oldChests : newChests-body.chests,
                newChests : newChests
            })
        });
    });
}
exports.deleteChests = async function(req, res) {
    const userid = req.params.userid
    if(userid.length > 18) return res.status(400).json({error : "userid can only be 18 characters long"});

    const body = req.body
    if (!body) return res.status(400).json({error : "body required"});

    const needed = ["username", "avatar", "chests"];
    for (var i = 0; i < needed.length; i++) {
        if(!body.hasOwnProperty(needed[i])) return res.status(400).json({error : "Proberty "+needed[i]+" required"});
    }
    
    con.query('SELECT chests FROM discord_levels WHERE userid = ?', [userid], function (error, results, fields) {
        const chests = results[0];
        if(!chests) {
            // USER isn't in DB yet
            let data = {
                userid : userid,
                username : body.username,
                avatar : body.avatar,
                xp : 0,
                chests : 0
            };
            con.query('INSERT INTO discord_levels SET ?', [data], function (error, results, fields) {
                if (error) throw error;
                return res.json({ error : "user has not enough chests" });
            });
        } else if(chests.chests >= body.chests) {
            con.query('UPDATE discord_levels SET chests = chests - ? WHERE userid = ?', [body.chests, userid], function (error, results, fields) {
                if (error) throw error;
                res.json({
                    action : "delete"
                })
            });
        } else {
            // USER has not enough CHESTS
            res.json({
                error : "user has not enough chests"
            })
        }
    });
}