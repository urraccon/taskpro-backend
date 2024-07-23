import { ctrlWrapper, sendEmail } from '../../helpers/index.js';

const helpMe = ctrlWrapper(async (req, res, next) => {
  const { email, name } = req.user;
  const { comment } = req.body;

  await sendEmail(email, {
    subject: 'Help Request - TaskPro',
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
            box-shadow: 0 0 10px #fff;
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
          .blockquote {
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #f9f9f9;
            border-left: 5px solid #ccc;
          }
          .note {
            background-color: #ffefc1;
            padding: 10px;
            border-radius: 5px;
            margin: 20px 0;
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
            <p>Thank you for reaching out to us. We have received your help request and will address it as soon as possible.</p>
            <p>One of our team members will get back to you with a solution to your issue within the next 24-48 hours.</p>
            
            <p><strong>Your request:</strong></p>
            <blockquote class="blockquote">${comment}</blockquote>

            <p class="note"><strong>Note:</strong> To ensure continuity and efficiency in addressing your request, please reply to this email instead of starting a new conversation.</p>
            
            <p class="contact">If you have any urgent issues, please contact us at support@taskpro.com.</p>
            <p>Best regards, <em>TaskPro Team</em></p>
          </div>
          <div class="footer-info">
            <p>&copy; 2024 TaskPro. All rights reserved.</p>
            <p>Your privacy is important to us. Your data will be handled securely and responsibly.</p>
          </div>
        </div>
      </body>
      </html>
      <svg width="0" height="0" style="position:absolute;visibility:hidden;">
        <symbol id="icon-logo" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 0H8C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0Z" fill="#1F1F1F" />
          <path d="M13.3314 23.0269C13.5759 21.7553 13.7841 20.4168 14.0783 19.0782C14.2232 18.3777 14.0466 18.0788 13.2635 18.1324C12.4804 18.1859 11.6068 18.1591 10.7739 18.1324C9.94105 18.1056 9.79167 17.6862 10.2715 17.0883C12.6343 14.1703 15.0243 11.2881 17.4053 8.41472C17.6724 8.08902 17.9802 7.85701 18.4193 8.1024C18.8583 8.3478 18.7678 8.6512 18.6954 9.01706C18.4328 10.3556 18.2156 11.6941 17.9259 13.0058C17.7765 13.684 17.9711 13.9249 18.6773 13.8982C19.386 13.8625 20.096 13.8625 20.8047 13.8982C21.2076 13.8982 21.7372 13.6885 21.9454 14.2373C22.1536 14.7861 21.7146 15.0181 21.4928 15.3438C20.5875 16.4592 19.6701 17.5731 18.7406 18.6856C17.3797 20.3097 16.0292 21.9278 14.6894 23.54C14.4268 23.8567 14.1326 24.1111 13.6845 23.9504C13.2364 23.7898 13.3314 23.4106 13.3314 23.0269Z" fill="white" />
        </symbol>
      </svg>
    `,
  });

  res.status(201).json({
    user: {
      name,
      email,
      comment,
    },
  });
});

export default helpMe;
