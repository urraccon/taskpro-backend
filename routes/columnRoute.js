import express from "express";
import { protectRoute, validateBody } from "../middlewares/index.js";
import {
  addColumn,
  deleteColumn,
  fetchColumn,
  fetchColumns,
  updateColumn,
} from "../controller/column/index.js";
import {
  columnSchema,
  fetchColumnsSchema,
  updateColumnSchema,
} from "../schemas/index.js";

const columnRoute = express.Router();

columnRoute
  .get("/", protectRoute, validateBody(fetchColumnsSchema), fetchColumns)
  .get("/:columnId", protectRoute, fetchColumn)
  .post("/", protectRoute, validateBody(columnSchema), addColumn)
  .patch(
    "/:columnId",
    protectRoute,
    validateBody(updateColumnSchema),
    updateColumn
  )
  .delete("/:columnId", protectRoute, deleteColumn);

export default columnRoute;
