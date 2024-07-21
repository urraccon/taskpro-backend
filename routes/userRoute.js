import express from 'express';
import { protectRoute, validateBody } from '../middlewares/index.js';
import { currentUser, updateTheme } from '../controller/user/index.js';
import { themeSchema } from '../schemas/userSchema.js';

const userRoute = express.Router();

userRoute
  .get('/current', protectRoute, currentUser)
  .patch('/update', protectRoute)
  .patch('/themes', protectRoute, validateBody(themeSchema), updateTheme)
  .post('/help', protectRoute);

export default userRoute;
