import User from '../models/User.model.js';
export const updateUser = async (req, res) => {
  const { displayName, id } = req.body;
  let userExist = await User.findOne({ _id: id }).exec();
  if (!userExist) return res.sendStatus(404);
  try {
    await User.updateOne({ _id: id }, { displayName });
    userExist = await User.findOne({ _id: id }).exec();
    const { password, ...rest } = userExist._doc;
    res.status(200).json(rest);
  } catch (error) {}
};

export const verifyUser = async (req, res) => {
  const { username } = req.params;
  if (!username) return res.sendStatus(401);
  const userExist = await User.findOne({ username }).exec();
  if (!userExist) return res.sendStatus(404);
  const { password, ...rest } = userExist._doc;
  if (req.user.username === rest.username) {
    let data = { ...rest, samePerson: true };
    res.status(200).json(data);
    return;
  }
  res.status(200).json(rest);
};
