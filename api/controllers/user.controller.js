import User from '../models/User.model';
const updateUser = async (req, res) => {
  const { displayName, id } = req.body;
  const userExist = User.findOne({ _id: id }).exec();
  if (userExist) {
    // dito nako
  }
};
