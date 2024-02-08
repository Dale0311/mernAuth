import express from 'express';
const router = express.Router();
import {
  googleAuthController,
  signInController,
  signUpController,
} from '../controllers/auth.controller.js';

router.post('/signin', signInController);
router.post('/signup', signUpController);
router.post('/google', googleAuthController);

export default router;
