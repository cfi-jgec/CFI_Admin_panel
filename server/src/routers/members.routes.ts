import { addMember, getAllMembers, getAlumniMembers, getMemberByYear, removeMember, updateMember } from '../controllers/members.controller';
import express from 'express';

const router = express.Router();

router.route('/').get(getAllMembers);
router.route('/alumni').get(getAlumniMembers);
router.route('/:year').get(getMemberByYear);
router.route('/add').post(addMember);
router.route('/remove').post(removeMember);
router.route('/update').post(updateMember);

export default router;