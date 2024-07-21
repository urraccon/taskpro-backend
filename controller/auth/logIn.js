import { httpError, ctrlWrapper } from '../../helpers/index.js';
import { userModel } from '../../models/index.js';
import { signToken } from '../../services/index.js';

const logIn = ctrlWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) throw httpError(401, 'Email or password is wrong');

  const isPasswordValidate = await user.checkPassword(password, user.password);

  if (!isPasswordValidate) throw httpError(401, 'Email or password is wrong');

  const token = signToken(user.id);

  user.token = token;

  await userModel.findByIdAndUpdate(user.id, user);

  user.password = undefined;
  res.user = user;

  res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatar: user.avatar,
      activeBoard: user.activeBoard,
      token,
    },
  });
});

export default logIn;
