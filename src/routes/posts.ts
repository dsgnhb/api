import {Request, Response, Router} from 'express';

import {posts} from '../services/route';

const TopDesign = require('../controllers/topdesign/topdesign');

let post_router = Router();


post_router.get(posts('/'), TopDesign.findAllTopDesigns); // Get all Posts
post_router.get(posts('/currentmonth'), TopDesign.findAllTopDesignsCurrentMonth); // Get all Posts for current Month
post_router.get(posts('/month'), TopDesign.findAllTopDesignsMonth); // Get all Posts sorted by Month
post_router.get(posts('/:id'), TopDesign.findTopDesignbyID); // Get Post by Id
post_router.post(posts(''), TopDesign.addTopDesign); // Add Post
post_router.put(posts('/:id'), TopDesign.changeTopDesignStatus); // Update Status of Post
post_router.delete(posts('/:id'), TopDesign.deleteTopDesign); // Delete Post
export default post_router;
