import express from 'express';
import userRoutes from './userRoutes.ts';
import projectRoutes from './projectRoutes.ts';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/project', projectRoutes);

export default router;