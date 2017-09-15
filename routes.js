const express = require('express');
const main = express.Router();
const topdesign = express.Router();
const levels = express.Router();
const donate = express.Router();
main.use('/topdesign', topdesign)
main.use('/levels', levels)
main.use('/donate', donate)

const design = require('./functions/topdesign.js');
const level = require('./functions/levels.js');
const donation = require('./functions/donate.js');

donate.post('/', donation.add); // Add Donation

topdesign.get('/posts/',design.findAll); // Get all Posts
topdesign.get('/posts/currentmonth',design.findAllCurrentMonth); // Get all Posts for current Month
topdesign.get('/posts/month',design.findAllMonth); // Get all Posts sorted by Month
topdesign.get('/posts/:id', design.findById); // Get Post by Id
topdesign.post('/posts', design.add); // Add Post
topdesign.put('/posts/:id', design.changeStatus); // Update Status of Post
topdesign.delete('/posts/:id', design.delete); // Delete Post

topdesign.post('/vote/:postid', design.vote); // Vote for Post

topdesign.get('/voted/:userid', design.voted); // Get Posts User voted for
topdesign.get('/submissions/:userid', design.submissions); // Get Submissions from User

levels.get('/', level.findAll); // Get all Level System data
levels.get('/:userid', level.findById); // Get Level System data by userid
levels.post('/xp/:userid', level.addXP); // Add XP
levels.delete('/xp/:userid', level.deleteXP); // Delete XP
levels.post('/chests/:userid', level.addChests); // Add Chests
levels.delete('/chests/:userid', level.deleteChests); // Delete Chests
  
module.exports = main;
