import express from 'express';
import { createUser, getUserData } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { handleRefreshToken, userLogin, userLogout } from '../controllers/login.controller';
const router = express.Router();

router.post('/register', createUser);
router.post('/login', userLogin);

router.get('/refresh-token', handleRefreshToken);

//protected routes
router.get('/profile', authMiddleware, getUserData);
router.post('/logout', authMiddleware, userLogout);

export default router;