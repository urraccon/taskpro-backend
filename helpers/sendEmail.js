import sendgrid from '@sendgrid/mail';
import { config } from 'dotenv';
import { httpError } from './index.js';

config();

const { SENDGRID_KEY } = process.env;

sendgrid.setApiKey(SENDGRID_KEY);

const sendEmail = async (userEmail, data) => {
  const email = {
    to: userEmail,
    ...data,
    from: 'valentin.cristian_98@icloud.com',
  };

  try {
    await sendgrid.send(email);

    console.log('📧 Email sent successfully! ');
  } catch (error) {
    console.log('📩 Email unsent! ');
    throw httpError(400, error.message);
  }
};

export default sendEmail;
