import express from 'express';
import { createUser } from '../controllers/UserController';
const router = express.Router();

router.post('/register', createUser);

router.post('/login', (req, res) => {
  res.send('Rota para login de usuário');
});

router.get('/profile', (req, res) => {
  res.send('Rota para perfil do usuário');
});

export default router;