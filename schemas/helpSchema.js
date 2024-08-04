import Joi from "joi";

const helpSchema = Joi.object({
  comment: Joi.string().required().min(10).max(200),
});

export { helpSchema };
export default { helpSchema };
