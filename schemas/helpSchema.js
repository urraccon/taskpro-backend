import Joi from "joi";

const helpSchema = Joi.object({
  comment: Joi.string().required().max(200),
});

export { helpSchema };
export default { helpSchema };
