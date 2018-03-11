import {Joi} from 'celebrate';

module Chests {
    export const ChestSchema = Joi.object().keys({
        username: Joi.string().required(),
        discriminator: Joi.number().min(0o0).max(9999).required(),
        avatar: Joi.string().regex(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).required(),
        chests: Joi.number().required()
    });
}

export =  Chests;
