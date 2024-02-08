import express from 'express';
import { updateUser, verifyUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/:username', verifyUser);
router.put('/', updateUser);

export default router;
