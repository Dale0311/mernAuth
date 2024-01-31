import express from 'express';
import controller from '../controllers/index.controllers.js';
const router = express.Router();

router.post('/', controller);
export default router;
