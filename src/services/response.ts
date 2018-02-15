import {Response} from 'express';

module Re {
    export function not_found(res: Response) {
        return res.status(404).json({error: 'Not found'});
    }

    export function body_missing(res: Response) {
        return res.status(500).json({error: 'Request Body is missing'});
    }

    export function userid_too_long(res: Response) {
        return res.status(500).json({error: 'userid can only be 18 characters long'});
    }

    export function not_sufficient(res: Response, property: String) {
        return res.status(500).json({error: 'user has not enough ' + property});
    }

    export function success(res: Response, object: Object) {
        return res.status(200).json(object);
    }

    export function property_required(res: Response, property: String) {
        return res.status(400).json({error: 'Property ' + property + ' required'});
    }

    export function already_existing(res: Response) {
        return res.status(408).json({error: 'You already inserted the topdesign for this month.'});
    }
}

export = Re;
