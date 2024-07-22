import Joi from 'joi';

const helpSchema = Joi.object({
  comment: Joi.string().required().max(256),
});

export { helpSchema };
export default { helpSchema };
