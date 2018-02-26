import { Router } from 'express';
import {celebrate, Joi} from 'celebrate';
import { validateBody } from 'vayder';

const { authenticate } = require('../services/authentication');

const Donation = require('../controllers/donation/donation');
import DonationSchema from '../models/validation/donation/donation';

let donate_router = Router();
donate_router.get('/', Donation.findAllDonations);
donate_router.post('/', [ validateBody(DonationSchema), authenticate ], Donation.addDonation);

export default donate_router;
