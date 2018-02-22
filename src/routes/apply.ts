import { Router } from 'express';

import {Vayder} from '../util/vayder';

const Application = require('../controllers/application/application');
const ApplicationSchema = require('../models/validation/application/application');

let apply_router = Router();
apply_router.use(Vayder.validateBody(ApplicationSchema, null));
apply_router.post('/', Application.apply);

export default apply_router;
