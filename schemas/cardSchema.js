import Joi from "joi";

const fetchCardsSchema = Joi.object({
  columnId: Joi.string().min(24).max(24).required(),
});

const cardSchema = Joi.object({});

export { fetchCardsSchema, cardSchema };
export default { fetchCardsSchema, cardSchema };
