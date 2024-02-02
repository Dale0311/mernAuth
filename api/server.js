import signUp from './routes/signUp.js';
import signIn from './routes/signin.js';
import express from 'express';
import dotenv from 'dotenv';
import dbCon from './config/dbCon.js';
import mongoose from 'mongoose';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import cookieParser from 'cookie-parser';
const app = express();

const PORT = 5500;
dotenv.config(corsOptions);
dbCon();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/signup', signUp);
app.use('/signin', signIn);
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
