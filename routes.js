const express = require('express')
const main = express.Router()
const R = require('./helpers/route-helper')

const design = require('./controllers/topdesign/topdesign.js')
const level = require('./controllers/levels/levels.js')
const donation = require('./controllers/donate/donate.js')

main.get('/', function(req, res) {
  res.json({ version: 1 })
})

main.post(R.donate('/'), donation.add) // Add Donation

main.get(R.posts('/'), design.findAll) // Get all Posts
main.get(R.posts('/currentmonth'), design.findAllCurrentMonth) // Get all Posts for current Month
main.get(R.posts('/month'), design.findAllMonth) // Get all Posts sorted by Month
main.get(R.posts('/:id'), design.findById) // Get Post by Id
main.post(R.posts(''), design.add) // Add Post
main.put(R.posts('/:id'), design.changeStatus) // Update Status of Post
main.delete(R.posts('/:id'), design.delete) // Delete Post

main.post(R.topdesign('/vote/:postid'), design.vote) // Vote for Post

main.get(R.topdesign('/voted/:userid'), design.voted) // Get Posts User voted for
main.get(R.topdesign('/submissions/:userid'), design.submissions) // Get Submissions from User

main.get(R.levels('/'), level.findAll) // Get all Level System data
main.get(R.levels('/:userid'), level.findById) // Get Level System data by userid
main.post(R.levels('/xp/:userid'), level.addXP) // Add XP
main.delete(R.levels('/xp/:userid'), level.deleteXP) // Delete XP
main.post(R.levels('/chests/:userid'), level.addChests) // Add Chests
main.delete(R.levels('/chests/:userid'), level.deleteChests) // Delete Chests
main.post(R.levels('/coins/:userid'), level.addCoins) // Add Coins
main.delete(R.levels('/coins/:userid'), level.deleteCoins) // Delete Coins
/*
main.stack.forEach(function(r){
  if (r.route && r.route.path) {
    console.log(r.route.path + '  ' + r.route.stack[0].method);

  }
}) */

module.exports = main
