const {Joi}: any = require('celebrate');

import { Router } from 'express';

import {Vayder} from '../util/vayder';

const Application = require('../controllers/application/application');

let schema = Joi.object().keys({
    about: Joi.string()
        .alphanum()
        .min(50)
        .required(),
    age: Joi.number()
        .integer()
        .min(13)
        .required(),
    discord: Joi.string()
        .regex(/.*#[0-9]{4}$/)
        .required(),
    mail: Joi.string()
        .email()
        .required(),
    motivation: Joi.string()
        .alphanum()
        .min(50)
        .required(),
    name: Joi.string()
        .alphanum()
        .max(40)
        .required(),
    experiences: Joi().string()
        .alphanum()
        .min(20)
        .required(),
    references: Joi().string()
        .required(),
    twitter: Joi().string()
        .regex(/@([A-Za-z0-9_]+)/)
        .required(),
});

let apply_router = Router();
apply_router.post('/', Vayder.validateBody(schema, undefined), Application.apply);

export default apply_router;
