import { errorHandler } from '../middleware/error.js';
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

const handleReq = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);
  const userExist = await User.findOne({ username }).exec();
  if (!userExist) return res.status(404).json({ message: 'No user found' });
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(userExist.password, hashPassword);
    const { password, ...rest } = userExist;
    if (!match)
      return res
        .status(401)
        .json({ message: 'Username or password is incorrect' });
    res.status(200).json({ rest });
  } catch (error) {
    next(errorHandler(500));
  }
};

export default handleReq;
