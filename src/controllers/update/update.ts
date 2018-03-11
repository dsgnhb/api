const util = require('util');
const exec = util.promisify(require('child_process').exec);
module Update {
    export async function run_update(req, res) {
        const {stdout, stderr} = await exec('../../update.sh');
        res.json({stdout: stdout, stderr: stderr});
    }
}
export = Update;
