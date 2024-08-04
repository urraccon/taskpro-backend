import dayjs from "dayjs";
import Joi from "joi";

const now = dayjs().startOf("day").toDate();

const cardsFetchingSchema = Joi.object({
  columnId: Joi.string().min(24).max(24).required(),
});

const cardSchema = Joi.object({
  title: Joi.string().min(2).max(36).required(),
  description: Joi.string().max(256),
  priority: Joi.string()
    .valid("no-priority", "low", "medium", "hight")
    .messages({
      "any.only":
        "The selected option does not match any of the allowed options: {{#valids}}",
    }),
  deadline: Joi.date().min(now).messages({
    "date.min": "You cannot set a deadline in the past",
  }),
  columnId: Joi.string().min(24).max(24).required(),
});

const cardUpdatingSchema = Joi.object({
  title: Joi.string().min(2).max(36),
  description: Joi.string().max(256),
  priority: Joi.string().valid("without", "low", "medium", "high").messages({
    "any.only":
      "The selected option does not match any of the allowed options: {{#valids}}",
  }),
  deadline: Joi.date().min(now).messages({
    "date.min": "You cannot set a deadline in the past",
  }),
});

const cardMovingSchema = Joi.object({
  columnId: Joi.string().min(24).max(24).required(),
});

export {
  cardsFetchingSchema,
  cardSchema,
  cardUpdatingSchema,
  cardMovingSchema,
};
export default {
  cardsFetchingSchema,
  cardSchema,
  cardUpdatingSchema,
  cardMovingSchema,
};
