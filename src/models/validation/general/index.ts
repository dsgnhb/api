import {Joi} from 'celebrate';

module General {
    export const userIdSchema = Joi.object({
        userid: Joi.required()
    });
}

export =  General;
