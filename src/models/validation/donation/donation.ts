import {Joi} from 'celebrate';

const Schema = Joi.object().keys({
    ip: Joi.string().ip().required(),
    code: Joi.string().required(),
    name: Joi.string().required()
});

export default Schema;
