import Joi from "joi";

const boardSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  icon: Joi.string()
    .valid(
      "project",
      "star",
      "loading",
      "puzzle-piece",
      "container",
      "lightning",
      "colors",
      "hexagon"
    )
    .messages({
      "any.only":
        "The selected option does not match any of the allowed options: {{#valids}}",
    }),
  background: Joi.string()
    .valid(
      "no-background",
      "flowers",
      "stars",
      "tree",
      "half-moon",
      "leaves",
      "cloud",
      "coast",
      "figure",
      "full-moon",
      "boat",
      "hot-air-ballon",
      "canyon",
      "ocean",
      "hot-air-ballons",
      "northern-lights"
    )
    .messages({
      "any.only":
        "The selected option does not match any of the allowed options: {{#valids}}",
    }),
});

const boardUpdatingSchema = Joi.object({
  title: Joi.string().min(2).max(50),
  icon: Joi.string()
    .valid(
      "project",
      "star",
      "loading",
      "puzzle-piece",
      "container",
      "lightning",
      "colors",
      "hexagon"
    )
    .messages({
      "any.only":
        "The selected option does not match any of the allowed options: {{#valids}}",
    }),
  background: Joi.string()
    .valid(
      "no-background",
      "flowers",
      "stars",
      "tree",
      "half-moon",
      "leaves",
      "cloud",
      "coast",
      "figure",
      "full-moon",
      "boat",
      "hot-air-ballon",
      "canyon",
      "ocean",
      "hot-air-ballons",
      "northern-lights"
    )
    .messages({
      "any.only":
        "The selected option does not match any of the allowed options: {{#valids}}",
    }),
});

export { boardSchema, boardUpdatingSchema };
export default { boardSchema, boardUpdatingSchema };
