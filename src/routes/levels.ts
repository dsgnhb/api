import { Router } from 'express';
const { authenticate } = require('../services/authentication');

const Chests = require('../controllers/levels/chests/chests');
const Coins = require('../controllers/levels/coins/coins');
const Level = require('../controllers/levels/levels');
const XP = require('../controllers/levels/xp/xp');

let levels_router = Router();

levels_router.get('/', Level.findAllLevels); // Get all Level System data
levels_router.get('/:userid', authenticate, Level.findLevelbyID); // Get Level System data by userid
levels_router.post('/xp/:userid', authenticate, XP.addXP); // Add XP
levels_router.delete('/xp/:userid', authenticate, XP.deleteXP); // Delete XP
levels_router.post('/chests/:userid', authenticate, Chests.addChest); // Add Chests
levels_router.delete('/chests/:userid', authenticate, Chests.deleteChest); // Delete Chests
levels_router.post('/coins/:userid', authenticate, Coins.addCoin); // Add Coins
levels_router.delete('/coins/:userid', authenticate, Coins.deleteCoin); // Delete Coins

export default levels_router;
