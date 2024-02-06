import { errorHandler } from '../middleware/error.js';
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handleReq = async (req, res, next) => {
  const { username, password: pwd } = req.body;
  if (!username || !pwd) return res.sendStatus(400);
  const userExist = await User.findOne({ username }).exec();
  if (!userExist) return res.status(404).json({ message: 'No user found' });
  try {
    const accessToken = jwt.sign(
      { id: userExist._id },
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

export default handleReq;
