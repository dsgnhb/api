import {Joi} from 'celebrate';

const Schema = Joi.object().keys({
    ip: Joi.string().alphanum().required(),
    code: Joi.string(),
    name: Joi.string()
});

export default Schema;
