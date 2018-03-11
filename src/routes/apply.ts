import { Router } from 'express';
import { validateBody } from 'vayder';
const Application = require('../controllers/application/application');
import  ApplicationSchema from '../models/validation/application/application';
import {paramAuthenticate} from '../services/authentication';

let apply_router = Router();
apply_router.get('/get/:token/:discord', paramAuthenticate, Application.getApplication);
apply_router.post('/', validateBody(ApplicationSchema), Application.apply);

export default apply_router;
