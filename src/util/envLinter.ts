const {Joi}: any = require('celebrate');
class EnvError extends Error {}

export function checker() {
    const schema = Joi.object({
        DB_HOST: Joi.string().alphanum().min(6).required(),
        DB_USER: Joi.string().alphanum().max(16),
        DB_PASS: Joi.string().alphanum().max(32),
        DB_DATABASE: Joi.string().alphanum(),
        IMGUR_CLIENT_ID: Joi.number(),
        IMGUR_CLIENT_SECRET: Joi.string().alphanum(),
        ENVIRONMENT: Joi.string().regex(/^(development|production)$/)
            .error(new EnvError('ENVIRONMENT is neither \'development\' nor \'production\''))
    });

    const envcheckresult = Joi.validate(process.env, schema, {allowUnknown: true});

    if (envcheckresult.error) {
        console.log('The Configuration lying in `src/.env` is malformed. See:');
        if (envcheckresult.error instanceof EnvError) {
            console.error(envcheckresult.error);
        } else {
            console.error(envcheckresult.error.details[0].message);
        }
        process.exit(1);
    }
    return;
}

