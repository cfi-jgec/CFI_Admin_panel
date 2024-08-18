import express from 'express';
import { addNotice, getAllNotices, removeNotice, updateNotice } from '../controllers/notice.controller';

const router = express.Router();

router.route('/').get(getAllNotices);
router.route('/add').post(addNotice);
router.route('/remove').post(removeNotice);
router.route('/update').post(updateNotice);

export default router;