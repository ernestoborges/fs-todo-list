import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createProject, deleteProject, getProject, getUserProjects, newTask, updateTask } from '../controllers/project.controller';
const router = express.Router();

router.get('/', authMiddleware, getUserProjects);
router.get('/:routeId', authMiddleware, getProject);
router.post('/', authMiddleware, createProject);
router.delete('/:title', authMiddleware, deleteProject);

router.post('/:routeId', authMiddleware, newTask);
router.patch('/:routeId/:taskId', authMiddleware, updateTask);

export default router;