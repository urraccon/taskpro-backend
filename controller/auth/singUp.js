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
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
          }
          .header {
            text-align: center;
            margin: 20px 0;
          }
          .header svg {
            width: 50px;
            height: 50px;
          }
          .content h2 {
            color: #333;
          }
          .content p {
            color: #555;
            line-height: 1.6;
          }
          .contact {
            margin: 20px 0;
            font-size: 14px;
            color: #666;
          }
          .footer-info {
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
            text-align: center;
          }
          @media (max-width: 600px) {
            .container {
              padding: 10px;
            }
            .header svg {
              width: 40px;
              height: 40px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <svg width="50" height="50">
              <use xlink:href="#icon-logo"></use>
            </svg>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Welcome to TaskPro! We're excited to have you on board.</p>
            <p>TaskPro is your all-in-one solution for managing your tasks efficiently and effectively. We hope you find our platform helpful and user-friendly.</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team at support@taskpro.com.</p>
            <p>Best regards, <em>TaskPro Team</em></p>
          </div>
          <div class="footer-info">
            <p>&copy; 2024 TaskPro. All rights reserved.</p>
            <p>Your privacy is important to us. Your data will be handled securely and responsibly.</p>
          </div>
        </div>
        <svg width="0" height="0" style="position:absolute;visibility:hidden;">
          <symbol id="icon-logo" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 0H8C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0Z" fill="#1F1F1F" />
            <path d="M13.3314 23.0269C13.5759 21.7553 13.7841 20.4168 14.0783 19.0782C14.2232 18.3777 14.0466 18.0788 13.2635 18.1324C12.4804 18.1859 11.6068 18.1591 10.7739 18.1324C9.94105 18.1056 9.79167 17.6862 10.2715 17.0883C12.6343 14.1703 15.0243 11.2881 17.4053 8.41472C17.6724 8.08902 17.9802 7.85701 18.4193 8.1024C18.8583 8.3478 18.7678 8.6512 18.6954 9.01706C18.4328 10.3556 18.2156 11.6941 17.9259 13.0058C17.7765 13.684 17.9711 13.9249 18.6773 13.8982C19.386 13.8625 20.096 13.8625 20.8047 13.8982C21.2076 13.8982 21.7372 13.6885 21.9454 14.2373C22.1536 14.7861 21.7146 15.0181 21.4928 15.3438C20.5875 16.4592 19.6701 17.5731 18.7406 18.6856C17.3797 20.3097 16.0292 21.9278 14.6894 23.54C14.4268 23.8567 14.1326 24.1111 13.6845 23.9504C13.2364 23.7898 13.3314 23.4106 13.3314 23.0269Z" fill="white" />
          </symbol>
        </svg>
      </body>
      </html>
    `,
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
