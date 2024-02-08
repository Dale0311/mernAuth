import express from 'express';
import { updateUser, verifyUser } from '../controllers/user.controller.js';
import verifyUserMiddleware from '../middleware/verifyUser.middleware.js';
const router = express.Router();

router.get('/:username', verifyUserMiddleware, verifyUser);
router.put('/:username/update', updateUser);

export default router;
