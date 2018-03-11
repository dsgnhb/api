import { Router } from 'express';
import {celebrate, Joi} from 'celebrate';
import { validateBody, validateParams } from 'vayder';

const { authenticate } = require('../services/authentication');


const TopDesign = require('../controllers/topdesign/topdesign');


import { postIdSchema } from '../models/validation/topdesign';
import { PostSchema } from '../models/validation/topdesign/posts';

let post_router = Router();

post_router.get('/', authenticate, TopDesign.findAllTopDesigns); // Get all Posts
post_router.get('/currentmonth', TopDesign.findAllTopDesignsCurrentMonth); // Get all Posts for current Month
post_router.get('/month', TopDesign.findAllTopDesignsMonth); // Get all Posts sorted by Month
post_router.get('/:id', [ validateParams(postIdSchema), authenticate ], TopDesign.findTopDesignbyID); // Get Post by Id
post_router.post('/', [ validateBody(PostSchema), authenticate ], TopDesign.addTopDesign); // Add Post
post_router.put('/:id', [ validateParams(postIdSchema), authenticate ], TopDesign.changeTopDesignStatus); // Update Status of Post
post_router.delete('/:id', [ validateParams(postIdSchema), authenticate ], TopDesign.deleteTopDesign); // Delete Post

export default post_router;
