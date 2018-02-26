import {Joi} from 'celebrate';

const Schema = Joi.object().keys({
    'g-recaptcha-response': Joi.string().required(),
    about: Joi.string()
        .min(50)
        .required(),
    age: Joi.number()
        .integer()
        .min(13)
        .required().error(new Error('Alter entspricht nicht den Vorgaben.')),
    discord: Joi.string()
        .regex(/.*#[0-9]{4}$/)
        .required()
        .error(new Error('Discord Tag entspricht nicht den Vorgaben.')),
    mail: Joi.string()
        .email()
        .required().error(new Error('Email entspricht nicht den Vorgaben.')),
    motivation: Joi.string()
        .min(50)
        .required(),
    name: Joi.string()
        .max(40)
        .required(),
    experiences: Joi.string()
        .min(20)
        .required(),
    references: Joi.string()
        .required(),
    twitter: Joi.string()
        .regex(/@([A-Za-z0-9_]+)/)
        .required().error(new Error('Twitter Nutzername entspricht nicht den Vorgaben.')),
});

export default Schema;
