import {Router} from 'express';
import {validateBody, validateParams} from 'vayder';
import * as fs from 'fs';
import provide from '../controllers/updateimage/update/provide';
import update from '../controllers/updateimage/update';

import {DataSchema} from '../models/validation/updateimage';
import {run_update} from '../controllers/update/update';


const {authenticate} = require('../services/authentication');

let root_router = Router();

root_router.get('/', getPackageVersion);

if (process.env.CI) {
root_router.get('/shutdown', (req, res) => {
    process.exit(0);
});
}

root_router.post('/post', [  validateBody(DataSchema), authenticate ], update);
root_router.get('/post_b', authenticate, provide);
root_router.get('/update', authenticate, run_update);


let ver: number;
function getPackageVersion(req, res) {
    if (!ver) {ver = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version; }

    return res.json({version: ver});
}

export default root_router;
