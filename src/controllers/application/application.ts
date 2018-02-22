import * as lowdb from 'lowdb';
import * as FileSync from'lowdb/adapters/FileSync';
const database = lowdb(new FileSync('./applications.json'));
database.defaults({
    applications: []
}).write();
const applications = database.get('applications');
const discord = require('./discord_webhook');

module Application {
    export async function apply(req, res) {

        let d_appl = applications.find({discord: req.body.discord});

        let obj = {
            about: req.body.about,
            age: req.body.age,
            discord: req.body.discord,
            mail: req.body.mail,
            motivation: req.body.motivation,
            name: req.body.name,
            experiences: req.body.experiences,
            references: req.body.references,
            twitter: req.body.twitter,
        };

        if (d_appl.value() != null) {
            d_appl.assign(obj).write();
            return res.json({status: 'existent'});
        }
        applications.push(obj).write();

        discord(conv_obj(obj));
        return res.json({status: 'inserted'});

        }

    function conv_obj(obj) {
        let buf = [];
        Object.keys(obj).forEach(function(key) {
            buf.push({title: key, value: obj[key]});
        });
        return buf;
        }
}
export = Application;

