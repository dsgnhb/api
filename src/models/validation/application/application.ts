import {Joi} from 'celebrate';


exports = Joi.object().keys({
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
    experiences: Joi.string()
        .alphanum()
        .min(20)
        .required(),
    references: Joi.string()
        .required(),
    twitter: Joi.string()
        .regex(/@([A-Za-z0-9_]+)/)
        .required(),
});
