import User from '../models/User.model.js';
const updateUser = async (req, res) => {
  res.sendStatus(200);
  // const { displayName, id } = req.body;
  // const userExist = await User.findOne({ _id: id }).exec();
  // if (!userExist) {
  //   res.sendStatus(404);
  // }
  // try {
  //   const currentUser = await User.updateOne({ _id: id }, { displayName });
  //   res.status(200).json(currentUser);
  // } catch (error) {}
};
export default updateUser;
