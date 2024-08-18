import { deletePhoto, getAllPhotos, uploadPhoto } from './../controllers/gallery.controller';
import express from 'express';

const router = express.Router();

router.route('/').get(getAllPhotos);
router.route('/delete').post(deletePhoto);
router.route('/upload').post(uploadPhoto);

export default router;