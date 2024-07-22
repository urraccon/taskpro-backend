import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';
import { ctrlWrapper, httpError } from '../../helpers/index.js';
import { userModel } from '../../models/index.js';

const avatarsDir = path.join(process.cwd(), 'public', 'avatars');

const updateUser = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  const { name, password, email } = req.body;
  const user = await userModel.findOne({ email });

  if (user) throw httpError(409, 'Email in use');

  const updatedUser = {};

  if (name && name !== req.user.name) updatedUser.name = name;
  if (password) updatedUser.password = await bcrypt.hash(password, 10);
  if (email) updatedUser.email = email;
  if (req.file) {
    const { filename, path: tempPath } = req.file;
    const newFilename = `id-${_id}${path.extname(filename)}`;
    const newPath = path.join(avatarsDir, newFilename);

    await fs.rename(tempPath, newPath);

    const newAvatar = `/avatars/${newFilename}`;

    updatedUser.avatar = newAvatar;
  }

  const updatedUserKeys = Object.keys(updatedUser).length;

  if (!updatedUserKeys) throw httpError(400, 'No changes were made');

  const result = await userModel.findByIdAndUpdate(_id, updatedUser, {
    new: true,
  });

  res.json({
    name: result.name,
    email: result.email,
    theme: result.theme,
    avatar: result.avatarURL,
    activeBoard: result.activeBoard,
  });
});

export default updateUser;
