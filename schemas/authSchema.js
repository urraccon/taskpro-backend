import Joi from 'joi';

const signUpSchema = Joi.object({
  name: Joi.string().min(4).required(),
  password: Joi.string().min(8).max(64).required(),
  email: Joi.string().required().email(),
});

const logInSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email(),
});

export { signUpSchema, logInSchema };
export default { signUpSchema, logInSchema };
