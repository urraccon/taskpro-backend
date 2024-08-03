import express from "express";
import { protectRoute, validateBody } from "../middlewares/index.js";
import {
  addCard,
  deleteCard,
  fetchCard,
  fetchCards,
  moveCard,
  updateCard,
} from "../controller/card/index.js";
import {
  cardMovingSchema,
  cardSchema,
  cardsFetchingSchema,
  cardUpdatingSchema,
} from "../schemas/index.js";

const cardRoute = express.Router();

cardRoute
  .get("/", protectRoute, validateBody(cardsFetchingSchema), fetchCards)
  .get("/:cardId", protectRoute, fetchCard)
  .post("/", protectRoute, validateBody(cardSchema), addCard)
  .patch("/:cardId", protectRoute, validateBody(cardUpdatingSchema), updateCard)
  .delete("/:cardId", protectRoute, deleteCard)
  .patch(
    "/:cardId/move",
    protectRoute,
    validateBody(cardMovingSchema),
    moveCard
  );

export default cardRoute;
