import { ctrlWrapper } from '../../helpers/index.js';
import { userModel } from '../../models/index.js';

const logOut = ctrlWrapper(async (req, res, next) => {
  const { token } = req.user;
  const user = await userModel.findOne({ token });

  user.token = null;

  await userModel.findByIdAndUpdate(user.id, user);

  res.status(204).json();
});

export default logOut;
