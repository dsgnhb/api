import {Router} from 'express';
import {levels} from '../services/route';
const authenticate = require('../services/authentication');
const Chests = require('../controllers/levels/chests/chests');
const Coins = require('../controllers/levels/coins/coins');
const Level = require('../controllers/levels/levels');
const XP = require('../controllers/levels/xp/xp');
let levels_router = Router();

levels_router.get(levels('/'), Level.findAllLevels); // Get all Level System data
levels_router.get(levels('/:userid'), authenticate.authenticate, Level.findLevelbyID); // Get Level System data by userid
levels_router.post(levels('/xp/:userid'), authenticate.authenticate, XP.addXP); // Add XP
levels_router.delete(levels('/xp/:userid'), authenticate.authenticate, XP.deleteXP); // Delete XP
levels_router.post(levels('/chests/:userid'), authenticate.authenticate, Chests.addChest); // Add Chests
levels_router.delete(levels('/chests/:userid'), authenticate.authenticate, Chests.deleteChest); // Delete Chests
levels_router.post(levels('/coins/:userid'), authenticate.authenticate, Coins.addCoin); // Add Coins
levels_router.delete(levels('/coins/:userid'), authenticate.authenticate, Coins.deleteCoin); // Delete Coins
export default levels_router;
