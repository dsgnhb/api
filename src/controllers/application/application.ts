import * as lowdb from 'lowdb';
import * as FileSync from'lowdb/adapters/FileSync';
const database = lowdb(new FileSync('./applications.json'));
database.defaults({
    applications: []
}).write();
const applications = database.get('applications');
const discord = require('./discord_webhook');
const simple_recaptcha = require('simple-recaptcha-new');

module Application {
    export async function apply(req, res) {
        simple_recaptcha(process.env.RECAPTCHA_KEY, req.ip, req.body['g-recaptcha-response'], (err) => {
            if(err) { return res.json({status: 'recaptcha-error'}); }

            let d_appl = applications.find({discord: req.body.discord});

            let obj = {
                About: req.body.about,
                Age: req.body.age,
                Discord: req.body.discord,
                Mail: req.body.mail,
                Motivation: req.body.motivation,
                Name: req.body.name,
                Experiences: req.body.experiences,
                References: req.body.references,
                Twitter: req.body.twitter,
            };

            if (d_appl.value() != null) {
                d_appl.assign(obj).write();
                return res.json({status: 'existent'});
            }
            applications.push(obj).write();

            discord(conv_obj(obj));
            return res.json({status: 'inserted'});
        });
    }

    function conv_obj(obj) {
        let buf = [];
        Object.keys(obj).forEach(function(key) {
            switch (key) {
                case 'Discord':
                    buf.push({title: key, value: `@${obj[key]}`});
                    break;
                case 'Mail':
                    buf.push({title: key, value: obj[key]});
                    break;
                case 'Name':
                    buf.push({title: key, value: obj[key]});
                    break;
                case 'Twitter':
                    buf.push({title: key, value: `${obj[key]}  <https://twitter.com/${obj[key].replace('@', '')}|Link>`});
                    break;
                default:
                    // This should prevent too long fields
                    // buf.push({title: key, value: obj[key]});
                    break;
            }

        });
        return buf;
        }
}
export = Application;

