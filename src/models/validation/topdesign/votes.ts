import {Joi} from 'celebrate';

module Voted {
    export const VoteSchema = Joi.object().keys({
        userid: Joi.number().required()
    });
}

export =  Voted;
