import {Joi} from 'celebrate';

module TopDesign {
    export const postIdSchema = Joi.object({
        id: Joi.number().postive().required()
    });
}

export =  TopDesign;
