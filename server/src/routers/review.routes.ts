import express from 'express'; 
import { acceptReview, getReview, giveReview, removeReview, updateReview } from '../controllers/review.controller';

const router = express.Router();

router.route('/').get(getReview);
router.route('/create').post(giveReview); 
router.route('/remove/:id').delete(removeReview);
router.route('/update/:id').patch(updateReview);
router.route('/accept/:id').patch(acceptReview);

export default router;