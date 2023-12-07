import express from 'express';
import { createUser } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { userLogin } from '../controllers/login.controller';
const router = express.Router();

router.post('/register', createUser);
router.post('/login', userLogin);
router.get('/profile', authMiddleware, (req, res) => {
  res.send('Rota para perfil do usuário');
});

export default router;