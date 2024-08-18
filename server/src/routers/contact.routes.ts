import express from 'express';
import { createQuery, deleteQuery, getAllQuery, resolve } from '../controllers/contact.controller';

const router = express.Router();

router.route('/all-query').get(getAllQuery);
router.route('/create').post(createQuery);
router.route('/resolve').post(resolve);
router.route('/delete').post(deleteQuery);

export default router;