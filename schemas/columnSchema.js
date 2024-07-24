import Joi from "joi";

const fetchColumnsSchema = Joi.object({
  boardId: Joi.string().min(24).max(24).required(),
});

const columnSchema = Joi.object({
  title: Joi.string().min(2).max(32).required(),
  boardId: Joi.string().min(24).max(24).required(),
});

const updateColumnSchema = Joi.object({
  title: Joi.string().min(2).max(32),
});

export { fetchColumnsSchema, columnSchema, updateColumnSchema };
export default { fetchColumnsSchema, columnSchema, updateColumnSchema };
