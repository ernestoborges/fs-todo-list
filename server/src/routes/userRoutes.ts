import express from 'express';
import { createUser, getUserData } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { handleRefreshToken, userLogin, userLogout } from '../controllers/login.controller';
import { createProject, deleteProject, getProjects } from '../controllers/project.controller';
const router = express.Router();

router.post('/register', createUser);
router.post('/login', userLogin);

router.get('/refresh-token', handleRefreshToken);

//protected routes
router.get('/profile', authMiddleware, getUserData);
router.post('/logout', authMiddleware, userLogout);
router.get('/my-projects', authMiddleware, getProjects);
router.post('/new-project', authMiddleware, createProject);
router.delete('/my-projects/:title', authMiddleware, deleteProject)

export default router;