import User from '../models/User.model.js';
const updateUser = async (req, res) => {
  const { displayName, id } = req.body;
  let userExist = await User.findOne({ _id: id }).exec();
  if (!userExist) return res.sendStatus(404);
  try {
    await User.updateOne({ _id: id }, { displayName });
    userExist = await User.findOne({ _id: id }).exec();
    res.status(200).json(userExist);
  } catch (error) {}
};
export default updateUser;
