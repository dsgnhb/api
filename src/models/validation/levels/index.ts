import {Joi} from 'celebrate';

module Levels {
    export const userIdSchema = Joi.object({
        userid: Joi.required()
    });
}

export =  Levels;
