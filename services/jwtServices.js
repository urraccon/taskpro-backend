import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { httpError } from '../helpers/index.js';

config();

const { JWT_SECRET } = process.env;

const signToken = id => jwt.sign({ id }, JWT_SECRET, { expiresIn: '24h' });

const checkToken = token => {
  if (!token) throw httpError(401, 'Not authorized');

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    return id;
  } catch (error) {
    throw httpError(401, 'Not authorized');
  }
};

export { signToken, checkToken };
export default { signToken, checkToken };
