import C = require('../config-rewrapper');
let keys;
module Authentication {

    export function authenticate (req, res, next) {
        gAuthenticate(req.header('token'), next, res);
    }

    export function getKeys() {
        if (keys) {return keys; }
        keys = C.apiKeys;
        return keys;
    }


    export function paramAuthenticate(req, res, next) {
        gAuthenticate(req.params.token, next, res);
    }

    function gAuthenticate (token, next, res) {

        if (!getKeys().includes(token)) {
            return res.status(403).json({error: 'Missing correct Access Token - Aborting ...'});
        }

        next();
    }
}
export = Authentication;

