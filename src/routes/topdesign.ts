import {Router} from 'express';
const { authenticate } = require('../services/authentication');

const Vote = require('../controllers/topdesign/voting/votes');

let topdesign_router = Router();

topdesign_router.post('/vote/:postid', authenticate, Vote.vote); // Vote for Post
topdesign_router.get('/voted/:userid', authenticate, Vote.voted); // Get Posts User voted for
topdesign_router.get('/submissions/:userid', authenticate, Vote.submissions); // Get Submissions from User

export default topdesign_router;
