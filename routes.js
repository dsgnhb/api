const express = require('express');
const main = express.Router();
const topdesign = express.Router();
main.use('/topdesign', topdesign)

const design = require('./functions/topdesign.js');
const xp = require('./functions/xp.js');
const chests = require('./functions/chests.js');

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

/*main.get('/xp/', xp.findAll());
main.get('/xp/:userid', xp.findById());
main.post('/xp', xp.add());
main.put('/xp/:id', xp.update());
main.delete('/xp/:id', xp.delete());

main.get('/chests/', chests.findAll());
main.get('/chests/:userid', chests.findById());
main.post('/chests', chests.add());
main.put('/chests/:id', chests.update());
main.delete('/chests/:id', chests.delete());*/
  
module.exports = main;
