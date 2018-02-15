import { Router } from 'express';
// import authenticate from '../services/authentication';
const { authenticate } = require('../services/authentication');

const DonationSchema = require('../models/validation/donation/donation');
import {Vayder} from '../util/vayder';

const Donation = require('../controllers/donation/donation');

let donate_router = Router();
donate_router.get('/', Donation.findAllDonations);
// donate_router.use('/', Vayder.validateBody(DonationSchema, undefined));
donate_router.post('/', authenticate, Donation.addDonation);

export default donate_router;
