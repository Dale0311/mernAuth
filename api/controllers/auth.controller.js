import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../middleware/error.js';

export const googleAuthController = async (req, res, next) => {
  const { username, displayName, password, photo } = req.body;
  //handle validation
  if (!username)
    return res.status(400).json({ messsage: 'username is required' });
  const userExist = await User.findOne({ username }).exec();
  //if there's an existing user
  if (userExist) {
    const { password, ...rest } = userExist._doc;
    const accessToken = jwt.sign(
      { username: userExist.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: '3h' }
    );
    return res
      .status(200)
      .cookie('accessToken', accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json(rest);
  }
  //if user does not exist
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      displayName,
      username,
      password: hashPassword,
      photo,
    });
    const accessToken = jwt.sign(
      { username: newUser.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: '3h' }
    );
    const { password, ...rest } = newUser._doc;
    res
      .status(201)
      .cookie(accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    errorHandler(next(500));
  }
};

export const signInController = async (req, res, next) => {
  const { username, password: pwd } = req.body;
  if (!username || !pwd) return res.sendStatus(400);
  const userExist = await User.findOne({ username }).exec();
  if (!userExist) return res.status(404).json({ message: 'No user found' });
  try {
    const accessToken = jwt.sign(
      { username: newUser.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: '3h' }
    );
    const match = await bcrypt.compare(pwd, userExist.password);
    const { password, ...rest } = userExist._doc;
    if (!match)
      return res
        .status(401)
        .json({ message: 'Username or password is incorrect' });
    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(errorHandler(500));
  }
};

export const signUpController = async (req, res, next) => {
  const { username, password, displayName } = req.body;
  if (!username || !password || !displayName) return res.sendStatus(400);
  const userExist = await User.findOne({ username }).exec();
  if (userExist)
    return res.status(409).json({ message: 'username already exist' });
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ displayName, username, password: hashPassword });
    res.sendStatus(201);
  } catch (error) {
    next(errorHandler(500));
  }
};
