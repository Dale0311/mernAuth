import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../middleware/error.js';
const googleAuth = async (req, res, next) => {
  const { username, displayName, password, photo } = req.body;

  //handle validation
  if (!username)
    return res.status(400).json({ messsage: 'username is required' });
  const userExist = await User.findOne({ username }).exec();

  //if there's an existing user
  if (userExist) {
    const { password, ...rest } = userExist._doc;
    const accessToken = jwt.sign(
      { id: userExist._id },
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
      { id: newUser._id },
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
export default googleAuth;
