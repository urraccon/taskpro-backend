import Joi from 'joi';

const themeSchema = Joi.object({
  theme: Joi.string().valid('dark', 'light', 'violet').required().messages({
    'any.required': 'Missing required theme field',
    'any.only': 'Field theme must be one of {{#valids}}',
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(32),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(64),
});

const updateActiveBoardSchema = Joi.object({
  activeBoard: Joi.string().required(),
});

export { updateUserSchema, themeSchema, updateActiveBoardSchema };
export default { updateUserSchema, themeSchema, updateActiveBoardSchema };
