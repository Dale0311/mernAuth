import User from '../models/User.model.js';
const handleReq = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);
  const userExist = await User.findOne({ username }).exec();
  console.log(userExist);
  if (userExist) return res.sendStatus(409);
  try {
    await User.create({ username, password });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(401);
  }
};

export default handleReq;
