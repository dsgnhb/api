'use strict';

// Test routes
import {Request, Response, Router} from 'express';

let router = Router();
router.get('/', (req: Request, res: Response) => {
    res.json({version: '1.5.0'});
});

export = router;
