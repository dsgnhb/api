exports.add = async (req, res) => {
    const body = req.body
    if (!req.body) return res.sendStatus(400)

    const needed = ["ip", "code"]
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