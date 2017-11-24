import {Router} from 'express';
import {donate} from '../services/route';
const DonationSchema = require('../models/validation/donation/donation');

const Donation = require('../controllers/donation/donation');

let donate_router = Router();

donate_router.post(donate('/'), Vayder.validateBody(DonationSchema), Donation.addDonation); // Add Donation
donate_router.get(donate('/'), Donation.findAllDonations);

export default donate_router;
