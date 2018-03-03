import { Router } from 'express';
import {celebrate, Joi} from 'celebrate';
import { validateBody, validateParams } from 'vayder';

const { authenticate } = require('../services/authentication');

const Vote = require('../controllers/topdesign/voting/votes');

import { userIdSchema } from '../models/validation/general';
import { postIdSchema } from '../models/validation/topdesign';
import { VoteSchema } from '../models/validation/topdesign/votes';

let topdesign_router = Router();

topdesign_router.post('/vote/:postid', [ validateParams(postIdSchema), validateBody(VoteSchema), authenticate ], Vote.vote); // Vote for Post
topdesign_router.get('/voted/:userid', [ validateParams(userIdSchema), authenticate ], Vote.voted); // Get Posts User voted for
topdesign_router.get('/submissions/:userid', [ validateParams(userIdSchema), authenticate ], Vote.submissions); // Get Submissions from User

export default topdesign_router;
