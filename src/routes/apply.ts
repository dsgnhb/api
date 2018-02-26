import { Router } from 'express';
import { validateBody } from 'vayder';
const Application = require('../controllers/application/application');
import  ApplicationSchema from '../models/validation/application/application';

let apply_router = Router();
apply_router.post('/', validateBody(ApplicationSchema), Application.apply);

export default apply_router;
