import C = require('../config-rewrapper');
let keys;
module Authentication {

    export function authenticate (req, res, next) {
        let token = req.header('token');
        if (!this.getkeys().includes(token)) {
            res.status(403).json({error: 'Missing correct Access Token - Aborting ...'});
            return;
        }
        next();
    }

    function getkeys() {
        if (keys) {return keys; }
        keys = C.apiKeys;
        return keys;
    }
}
export = Authentication;

