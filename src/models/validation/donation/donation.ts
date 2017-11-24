const {Joi}: any = require('celebrate');

exports = Joi.object().keys({
    ip: Joi.string().alphanum().required(),
    code: Joi.string(),
    name: Joi.string()
});
