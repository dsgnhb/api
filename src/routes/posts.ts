import { Router } from 'express';
const { authenticate } = require('../services/authentication');

const TopDesign = require('../controllers/topdesign/topdesign');

let post_router = Router();

post_router.get('/', authenticate, TopDesign.findAllTopDesigns); // Get all Posts
post_router.get('/currentmonth', TopDesign.findAllTopDesignsCurrentMonth); // Get all Posts for current Month
post_router.get('/month', TopDesign.findAllTopDesignsMonth); // Get all Posts sorted by Month
post_router.get('/:id', authenticate, TopDesign.findTopDesignbyID); // Get Post by Id
post_router.post('/', authenticate, TopDesign.addTopDesign); // Add Post
post_router.put('/:id', authenticate, TopDesign.changeTopDesignStatus); // Update Status of Post
post_router.delete('/:id', authenticate, TopDesign.deleteTopDesign); // Delete Post

export default post_router;
