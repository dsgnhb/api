import {Joi} from 'celebrate';

module UpdateImage {
    export const DataSchema = Joi.object().keys({
        header1: Joi.string().required(),
        header2: Joi.string().required(),
        bgimg: Joi.string().regex(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).required(),
        content: Joi.string().required()
    });
}

export =  UpdateImage;
