import express from "express";
import { protectRoute, validateBody } from "../middlewares/index.js";
import {
  addCard,
  deleteCard,
  fetchCard,
  fetchCards,
  updateCard,
} from "../controller/card/index.js";
import {
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
  .delete("/:cardId", protectRoute, deleteCard);

export default cardRoute;
