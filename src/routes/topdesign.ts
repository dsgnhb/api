import {Router} from "express";
import {topdesign} from "../services/route";

const Vote = require('../controllers/topdesign/votes');

let topdesign_router = Router();
topdesign_router.get('/', (req: Request, res: Response) => {
    res.json({version: '1.5.0'});
});

topdesign_router.post(topdesign('/vote/:postid'), Vote.vote); // Vote for Post
topdesign_router.get(topdesign('/voted/:userid'), Vote.voted); // Get Posts User voted for
topdesign_router.get(topdesign('/submissions/:userid'), Vote.submissions); // Get Submissions from User
export default topdesign_router;
