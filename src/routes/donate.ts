import {Router} from 'express';
import {donate} from '../services/route';
const DonationSchema = require('../models/validation/donation/donation');
import {Vayder} from '../util/vayder';
const authenticate = require('../services/authentication');
const Donation = require('../controllers/donation/donation');

let donate_router = Router();
donate_router.get(donate('/'), Donation.findAllDonations);

donate_router.use(donate('/'), Vayder.validateBody(DonationSchema, undefined));

donate_router.post(donate('/'), authenticate.authenticate, Donation.addDonation);

export default donate_router;
