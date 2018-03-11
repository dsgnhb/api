import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

const database = lowdb(new FileSync('./applications.json'));
database.defaults({
    applications: []
}).write();
const applications = database.get('applications');
const discord = require('./discord_webhook');
const simple_recaptcha = require('simple-recaptcha-new');
const util = require('../../util/util');

module Application {
    export async function apply(req, res) {
        let random = await util.generateToken();

        simple_recaptcha(process.env.RECAPTCHA_KEY, req.ip, req.body['g-recaptcha-response'], err => {
            if (err) {
                return res.json({status: 'recaptcha-error'});
            }

            let existing_application = applications.find({discord: req.body.discord});
            let record = {
                AccessToken: random,
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

            if (existing_application.value() != null) {
                existing_application.assign(record).write();
                return res.json({status: 'existent'});
            }
            applications.push(record).write();

            discord(conv_obj(record));
            return res.json({status: 'inserted'});
        });
    }

    function conv_obj(obj) {
        let result_buffer = [];
        Object.keys(obj).forEach(function(key) {
            switch (key) {
                case 'Discord':
                    result_buffer.push({title: key, value: `@${obj[key]}`});
                    break;
                case 'Mail':
                    result_buffer.push({title: key, value: obj[key]});
                    break;
                case 'Name':
                    result_buffer.push({title: key, value: obj[key]});
                    break;
                case 'Twitter':
                    result_buffer.push({
                        title: key,
                        value: `${obj[key]} <https://twitter.com/${obj[key].replace('@', '')}|Link>`
                    });
                    break;
                default:
                    // This should prevent too long fields
                    // result_buffer.push({title: key, value: obj[key]});
                    break;
            }
        });
        result_buffer.push({
            title: 'Online-Viewer',
            value: `<https://api.dsgnhb.de/apply/get/${obj.AccessToken}/${obj.Twitter}|Viewer>`
        });
        return result_buffer;
        }


    export async function getApplication(req, res) {
        let application = applications.find({Twitter: req.params.twitter, AccessToken: req.params.token});
        if(application.value() != null) {
            return res.json(application);
        }
        res.status(404).json({status: 'not found or token incorrect'});
    }


}
export = Application;

