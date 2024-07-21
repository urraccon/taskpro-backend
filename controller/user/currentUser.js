import { httpError, ctrlWrapper } from '../../helpers/index.js';
import { userModel } from '../../models/index.js';

const currentUser = ctrlWrapper(async (req, res, next) => {
  const { token } = req.user;
  const user = await userModel.findOne({ token });

  if (!user) throw httpError(401, 'User data not found');

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    theme: user.theme,
    avatar: user.avatarURL,
    activeBoard: user.activeBoard,
  });
});

export default currentUser;
