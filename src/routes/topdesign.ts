import {Router} from 'express';
import {topdesign} from '../services/route';
const authenticate = require('../services/authentication');

const Vote = require('../controllers/topdesign/voting/votes');

let topdesign_router = Router();

topdesign_router.post(topdesign('/vote/:postid'), authenticate.authenticate,  Vote.vote); // Vote for Post
topdesign_router.get(topdesign('/voted/:userid'), authenticate.authenticate, Vote.voted); // Get Posts User voted for
topdesign_router.get(topdesign('/submissions/:userid'), authenticate.authenticate, Vote.submissions); // Get Submissions from User
export default topdesign_router;
