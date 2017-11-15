import {Request, Response, Router} from 'express';
import {donate} from '../services/route';

const Donation = require('../controllers/donation/donation');

let donate_router = Router();

donate_router.post(donate('/'), Donation.addDonation); // Add Donation
donate_router.get(donate('/'), Donation.findAllDonations);

export default donate_router;
