import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel } from "../../models/index.js";

const deleteBoard = ctrlWrapper(async (req, res, next) => {
  const { boardId } = req.params;
  const board = await boardModel.findByIdAndDelete(boardId);

  if (!board) throw httpError(404, `The board ID ${boardId} was not found`);

  res.status(204).send();
});

export default deleteBoard;
