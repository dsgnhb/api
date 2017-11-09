'use strict';

// Test routes
import {Request, Response, Router} from 'express';

let router = Router();
router.get('/', (req: Request, res: Response) => {
    res.json({version: '1.5.0'});
});

router.post(donate('/'), Donation.add); // Add Donation
router.get(donate('/'), Donation.findAll);

router.get(posts('/'), Topdesign.findAll); // Get all Posts
router.get(posts('/currentmonth'), Topdesign.findAllCurrentMonth); // Get all Posts for current Month
router.get(posts('/month'), Topdesign.findAllMonth); // Get all Posts sorted by Month
router.get(posts('/:id'), Topdesign.findById); // Get Post by Id
router.post(posts(''), Topdesign.add); // Add Post
router.put(posts('/:id'), Topdesign.changeStatus); // Update Status of Post
router.delete(posts('/:id'), Topdesign.delete); // Delete Post

router.post(topdesign('/vote/:postid'), Votes.vote()); // Vote for Post

router.get(topdesign('/voted/:userid'), Votes.voted); // Get Posts User voted for
router.get(topdesign('/submissions/:userid'), Votes.submissions); // Get Submissions from User

router.get(levels('/'), Levels.findAll); // Get all Level System data
router.get(levels('/:userid'), Levels.findById); // Get Level System data by userid
router.post(levels('/xp/:userid'), XP.add); // Add XP
router.delete(levels('/xp/:userid'), XP.remove); // Delete XP
router.post(levels('/chests/:userid'), Chest.add); // Add Chests
router.delete(levels('/chests/:userid'), Chest.remove); // Delete Chests
router.post(levels('/coins/:userid'), Coins.add); // Add Coins
router.delete(levels('/coins/:userid'), Coins.remove); // Delete Coins
/*
main.stack.forEach(function(r){
  if (r.route && r.route.path) {
    console.log(r.route.path + '  ' + r.route.stack[0].method);

  }
}) */

function topdesign (routename) {
    return `/topdesign${routename}`;
}

function levels (routename) {
    return `/levels${routename}`;
}

function donate(routename) {
    return `/donate${routename}`;
}

function posts (routename) {
    return `/topdesign/posts${routename}`;
}
export = router;
