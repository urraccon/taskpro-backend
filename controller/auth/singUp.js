import { userModel } from '../../models/index.js';
import { httpError, ctrlWrapper, sendEmail } from '../../helpers/index.js';
import { signToken } from '../../services/index.js';

const signUp = ctrlWrapper(async (req, res) => {
  const { email, name } = req.body;
  const user = await userModel.findOne({ email });

  if (user) throw httpError(409, 'Email in use');

  const activeBoard = null;
  const newUser = await userModel.create({ ...req.body, activeBoard });
  const { _id: id } = newUser;
  const token = signToken(id);

  await sendEmail(email, {
    subject: 'Welcome to TaskPro',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Hello ${name},</h2>
        <p>Welcome to TaskPro! We're excited to have you on board.</p>
        <p>TaskPro is your all-in-one solution for managing your tasks efficiently and effectively. We hope you find our platform helpful and user-friendly.</p>
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p>Best regards,</p>
        <p><em>The TaskPro Team</em></p>
      </div>`,
  });

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
