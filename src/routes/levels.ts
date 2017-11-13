import {Router} from "express";
import {levels} from "../services/route";
const Chests = require('../controllers/levels/chests');
const Coins = require('../controllers/levels/coins');
const Level = require('../controllers/levels/levels');
const XP = require('../controllers/levels/xp');
let levels_router = Router();

levels_router.get(levels('/'), Level.findAllLevels); // Get all Level System data
levels_router.get(levels('/:userid'), Level.findLevelbyID); // Get Level System data by userid
levels_router.post(levels('/xp/:userid'), XP.addXP); // Add XP
levels_router.delete(levels('/xp/:userid'), XP.deleteXP); // Delete XP
levels_router.post(levels('/chests/:userid'), Chests.addChest); // Add Chests
levels_router.delete(levels('/chests/:userid'), Chests.deleteChest); // Delete Chests
levels_router.post(levels('/coins/:userid'), Coins.addCoin); // Add Coins
levels_router.delete(levels('/coins/:userid'), Coins.deleteCoin); // Delete Coins
export default levels_router;
