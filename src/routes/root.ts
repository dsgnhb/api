import {Router} from 'express';
import * as fs from 'fs';
import provide from '../controllers/updateimage/update/provide';
import update from '../controllers/updateimage/update';

let root_router = Router();

root_router.get('/', getPackageVersion);

if (process.env.CI) {
root_router.get('/shutdown', (req, res) => {

    process.exit(0);

});
}


root_router.get('/post', update);
root_router.get('/update_b', provide);


let ver: number;
function getPackageVersion(req, res) {
    if (!ver) {ver = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version; }

    return res.json({version: ver});
}


export default root_router;
