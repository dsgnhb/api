import { Router } from 'express';
import {celebrate, Joi} from 'celebrate';
import { validateBody } from 'vayder';

const { authenticate } = require('../services/authentication');

const Application = require('../controllers/application/application');
import  ApplicationSchema from '../models/validation/application/application';

let apply_router = Router();
apply_router.post('/', [ validateBody(ApplicationSchema), authenticate ], Application.apply);

export default apply_router;
