import express from "express";
import { protectRoute, validateBody } from "../middlewares/index.js";
import { addCard, fetchCard, fetchCards } from "../controller/cards/index.js";
import { cardSchema, fetchCardsSchema } from "../schemas/index.js";

const cardRoute = express.Router();

cardRoute
  .get("/", protectRoute, validateBody(fetchCardsSchema), fetchCards)
  .get("/:cardId", protectRoute, fetchCard)
  .post("/", protectRoute, validateBody(cardSchema), addCard);

export default cardRoute;
