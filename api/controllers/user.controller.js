import User from '../models/User.model.js';
export const updateUser = async (req, res) => {
  const { displayName, id } = req.body;
  let userExist = await User.findOne({ _id: id }).exec();
  if (!userExist) return res.sendStatus(404);
  try {
    await User.updateOne({ _id: id }, { displayName });
    userExist = await User.findOne({ _id: id }).exec();
    res.status(200).json(userExist);
  } catch (error) {}
};

export const verifyUser = async (req, res) => {
  const { username } = req.params;
  if (!username) return res.sendStatus(401);
  const userExist = await User.findOne({ username }).exec();
  if (!userExist) return res.sendStatus(404);
  // dito na me

  res.sendStatus(200);
};
