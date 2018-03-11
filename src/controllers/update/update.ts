const util = require('util');
const exec = util.promisify(require('child_process').exec);
module Update {
    export async function run_update(req, res) {
        res.json({message: 'Updating!..'});
        exec('../../../update.sh');
    }
}
export = Update;
