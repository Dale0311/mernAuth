import express from 'express';
const route = express.Router();
import googleAuth from '../controllers/googleAuth.controller.js';

route.post('/', googleAuth);

export default route;
