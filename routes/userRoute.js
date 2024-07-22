import express from 'express';
import { protectRoute, validateBody, upload } from '../middlewares/index.js';
import {
  currentUser,
  updateTheme,
  deleteUser,
  updateUser,
  helpMe,
} from '../controller/user/index.js';
import { themeSchema, updateUserSchema, helpSchema } from '../schemas/index.js';

const userRoute = express.Router();

userRoute
  .get('/current', protectRoute, currentUser)
  .patch('/themes', protectRoute, validateBody(themeSchema), updateTheme)
  .delete('/delete', protectRoute, deleteUser)
  .post('/help', protectRoute, validateBody(helpSchema), helpMe)
  .patch(
    '/update',
    protectRoute,
    upload.single('avatar'),
    validateBody(updateUserSchema),
    updateUser
  );

export default userRoute;
