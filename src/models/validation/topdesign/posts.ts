import {Joi} from 'celebrate';

module Posts {
    export const PostSchema = Joi.object().keys({
        username: Joi.string().required(),
        userid: Joi.number().required(),
        avatar: Joi.string().regex(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).required(),
        image: Joi.string().regex(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).required(),
        content: Joi.string().required()
    });
}

export =  Posts;
