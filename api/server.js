import auth from './routes/auth.route.js';
import profile from './routes/user.js';

import express from 'express';
import dotenv from 'dotenv';
import dbCon from './config/dbCon.js';
import mongoose from 'mongoose';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import cookieParser from 'cookie-parser';
const app = express();

const PORT = 5500;
dotenv.config();
dbCon();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/', auth);
app.use('/profile', profile);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = statusCode === 500 ? 'Internal Server Error' : err.message;
  res
    .status(statusCode)
    .json({ success: false, message: errMessage, statusCode });
});

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listen in PORT ${PORT}`);
  });
});
