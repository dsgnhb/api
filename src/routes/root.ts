import {Router} from 'express';
import * as fs from 'fs';
let root_router = Router();

root_router.get('/', getPackageVersion);

function getPackageVersion(req, res) {
    return res.json(JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version);
}
export default root_router;
