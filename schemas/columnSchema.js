import Joi from "joi";

const columnsFetchingSchema = Joi.object({
  boardId: Joi.string().min(24).max(24).required(),
});

const columnSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  boardId: Joi.string().min(24).max(24).required(),
});

const columnUpdatingSchema = Joi.object({
  title: Joi.string().min(3).max(50),
});

export { columnsFetchingSchema, columnSchema, columnUpdatingSchema };
export default { columnsFetchingSchema, columnSchema, columnUpdatingSchema };
