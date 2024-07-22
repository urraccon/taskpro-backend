import { httpError, ctrlWrapper } from '../../helpers/index.js';
import { userModel } from '../../models/index.js';

const deleteUser = ctrlWrapper(async (req, res, next) => {
  const { _id } = req.user;
  const user = await userModel.findByIdAndDelete({ _id });

  if (!user) throw httpError(401, 'User data not found');

  res.status(204).json();
});

export default deleteUser;
