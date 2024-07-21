import { userModel } from '../../models/index.js';
import { httpError, ctrlWrapper } from '../../helpers/index.js';
import { signToken } from '../../services/index.js';

const signUp = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (user) throw httpError(409, 'Email in use');

  const activeBoard = null;
  const newUser = await userModel.create({ ...req.body, activeBoard });
  const { _id: id } = newUser;
  const token = signToken(id);

  await userModel.findByIdAndUpdate(id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      theme: newUser.theme,
      avatar: newUser.avatar,
      activeBoard: newUser.activeBoard,
    },
  });
});

export default signUp;
