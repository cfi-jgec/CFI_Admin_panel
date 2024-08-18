import express from 'express';
import { addProject, allProjects, approvedProject, getProjectDetails, removeProject } from '../controllers/project.controller';

const router = express.Router();

router.route('/').get(allProjects);
router.route('/add').post(addProject);
router.route('/details/:id').get(getProjectDetails);
router.route('/remove/:id').delete(removeProject);
router.route('/approve/:id').patch(approvedProject); 

export default router;