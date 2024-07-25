import express from "express";
import { protectRoute, validateBody } from "../middlewares/index.js";
import {
  fetchBoards,
  fetchBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from "../controller/board/index.js";
import { boardSchema, boardUpdatingSchema } from "../schemas/index.js";

const boardRoute = express.Router();

boardRoute
  .get("/", protectRoute, fetchBoards)
  .get("/:boardId", protectRoute, fetchBoard)
  .post("/", protectRoute, validateBody(boardSchema), addBoard)
  .patch(
    "/:boardId",
    protectRoute,
    validateBody(boardUpdatingSchema),
    updateBoard
  )
  .delete("/:boardId", protectRoute, deleteBoard);

export default boardRoute;
