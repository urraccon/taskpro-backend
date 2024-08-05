import Joi from "joi";

const helpSchema = Joi.object({
  comment: Joi.string().required().min(5).max(250),
});

export { helpSchema };
export default { helpSchema };
