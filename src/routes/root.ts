import { Router } from 'express';
import {celebrate, Joi} from 'celebrate';
import { validateBody, validateParams } from 'vayder';
import * as fs from 'fs';


const { authenticate } = require('../services/authentication');

import provide from '../controllers/updateimage/update/provide';
import update from '../controllers/updateimage/update';

import { DataSchema } from '../models/validation/updateimage';

let root_router = Router();

root_router.get('/', getPackageVersion);

if (process.env.CI) {
root_router.get('/shutdown', (req, res) => {
    process.exit(0);
});
}

root_router.post('/post', [  validateBody(DataSchema), authenticate ], update);
root_router.get('/post_b', authenticate, provide);


let ver: number;
function getPackageVersion(req, res) {
    if (!ver) {ver = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version; }

    return res.json({version: ver});
}

export default root_router;
