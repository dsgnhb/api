const {Joi}: any = require('celebrate');

exports = Joi.object().keys({
    ip: Joi.string().alphanumeric().required(),
    code: Joi.string(),
    name: Joi.string()
});
