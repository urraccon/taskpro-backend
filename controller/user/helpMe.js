import { ctrlWrapper, sendEmail } from '../../helpers/index.js';

const helpMe = ctrlWrapper(async (req, res, next) => {
  const { email, name } = req.user;
  const { comment } = req.body;

  await sendEmail(email, {
    subject: 'Help Request - TaskPro',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to us. We have received your help request and will address it as soon as possible.</p>
        <p>One of our team members will get back to you with a solution to your issue.</p>
        
        <p><strong>Your request:</strong></p>
        <blockquote>${comment}</blockquote>
        
        <p>Best regards,</p>
        <p><em>The TaskPro Team</em></p>
      </div>`,
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
