import { userModel } from '../../models/index.js';
import { httpError, ctrlWrapper } from '../../helpers/index.js';

const updateTheme = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  const { theme } = req.body;
  const result = await userModel.findOneAndUpdate(_id, { theme });

  if (!result) throw httpError(404, 'User not found');

  res.json({
    theme,
    message: `${theme} mode ON.`,
  });
});

export default updateTheme;
