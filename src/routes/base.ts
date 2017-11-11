'use strict';

// Test routes
import {Request, Response, Router} from 'express';

const Donation = require('../controllers/donation/donation');
const TopDesign = require('../controllers/topdesign/topdesign');
const Chests = require('../controllers/levels/chests');
const Coins = require('../controllers/levels/coins');
const Level = require('../controllers/levels/levels');
const XP = require('../controllers/levels/xp');
const Vote = require('../controllers/topdesign/votes');

let router = Router();
router.get('/', (req: Request, res: Response) => {
    res.json({version: '1.5.0'});
});
router.post(donate('/'), Donation.addDonation); // Add Donation
router.get(donate('/'), Donation.findAllDonations);

router.get(posts('/'), TopDesign.findAllTopDesigns); // Get all Posts
router.get(posts('/currentmonth'), TopDesign.findAllTopDesignsCurrentMonth); // Get all Posts for current Month
router.get(posts('/month'), TopDesign.findAllTopDesignsMonth); // Get all Posts sorted by Month
router.get(posts('/:id'), TopDesign.findTopDesignbyID); // Get Post by Id
router.post(posts(''), TopDesign.addTopDesign); // Add Post
router.put(posts('/:id'), TopDesign.changeTopDesignStatus); // Update Status of Post
router.delete(posts('/:id'), TopDesign.deleteTopDesign); // Delete Post

router.post(topdesign('/vote/:postid'), Vote.vote); // Vote for Post
router.get(topdesign('/voted/:userid'), Vote.voted); // Get Posts User voted for
router.get(topdesign('/submissions/:userid'), Vote.submissions); // Get Submissions from User

router.get(levels('/'), Level.findAllLevels); // Get all Level System data
router.get(levels('/:userid'), Level.findLevelbyID); // Get Level System data by userid
router.post(levels('/xp/:userid'), XP.addXP); // Add XP
router.delete(levels('/xp/:userid'), XP.deleteXP); // Delete XP
router.post(levels('/chests/:userid'), Chests.addChest); // Add Chests
router.delete(levels('/chests/:userid'), Chests.deleteChest); // Delete Chests
router.post(levels('/coins/:userid'), Coins.addCoin); // Add Coins
router.delete(levels('/coins/:userid'), Coins.deleteCoin); // Delete Coins
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
