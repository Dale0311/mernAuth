import { errorHandler } from '../middleware/error.js';
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

const handleReq = async (req, res, next) => {
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

export default handleReq;
