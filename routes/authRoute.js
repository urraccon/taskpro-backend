import express from 'express';
import { signUp, logIn, logOut } from '../controller/auth/index.js';
import { validateBody, protectRoute } from '../middlewares/index.js';
import { signUpSchema, logInSchema } from '../schemas/authSchema.js';

const authRoute = express.Router();

authRoute
  .post('/signup', validateBody(signUpSchema), signUp)
  .post('/login', validateBody(logInSchema), logIn)
  .post('/logout', protectRoute, logOut);

export default authRoute;
