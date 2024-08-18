import express from 'express';
import { createFolder, deleteCertificate, deleteFolder, getCertificate, getAllFolders, uploadCertificate } from '../controllers/certificate.controller';

const router = express.Router();

router.route('/folders').get(getAllFolders);
router.route('/folder/create').post(createFolder);
router.route('/folder/delete').post(deleteFolder);

router.route('/certificate/upload').post(uploadCertificate);
router.route('/certificate/delete').post(deleteCertificate);
router.route('/certificates').post(getCertificate);

export default router;