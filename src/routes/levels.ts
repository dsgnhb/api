import { Router } from 'express';
import {celebrate, Joi} from 'celebrate';
import { validateBody, validateParams } from 'vayder';

const { authenticate } = require('../services/authentication');

const Chests = require('../controllers/levels/chests/chests');
const Coins = require('../controllers/levels/coins/coins');
const Level = require('../controllers/levels/levels');
const XP = require('../controllers/levels/xp/xp');

import { userIdSchema } from '../models/validation/general';
import { ChestSchema } from '../models/validation/levels/chests';
import { CoinSchema } from '../models/validation/levels/coins';
import { XPSchema } from '../models/validation/levels/xp';


let levels_router = Router();

levels_router.get('/', Level.findAllLevels); // Get all Level System data
levels_router.get('/:userid', [ validateParams(userIdSchema), authenticate ], Level.findLevelbyID); // Get Level System data by userid
levels_router.post('/xp/:userid', [ validateParams(userIdSchema), validateBody(XPSchema), authenticate ], XP.addXP); // Add XP
levels_router.delete('/xp/:userid', [ validateParams(userIdSchema), validateBody(XPSchema), authenticate ], XP.removeXP); // Remove XP
levels_router.post('/chests/:userid', [ validateParams(userIdSchema), validateBody(ChestSchema), authenticate ], Chests.addChest); // Add Chests
levels_router.delete('/chests/:userid', [ validateParams(userIdSchema), validateBody(ChestSchema), authenticate ], Chests.removeChest); // Remove Chests
levels_router.post('/coins/:userid', [ validateParams(userIdSchema), validateBody(CoinSchema), authenticate ], Coins.addCoin); // Add Coins
levels_router.delete('/coins/:userid', [ validateParams(userIdSchema), validateBody(CoinSchema), authenticate ], Coins.removeCoin); // Remove Coins

export default levels_router;
