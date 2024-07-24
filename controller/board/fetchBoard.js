import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel } from "../../models/index.js";

const fetchBoard = ctrlWrapper(async (req, res, next) => {
  const { boardId } = req.params;
  const board = await boardModel.findById(boardId);

  if (!board) throw httpError(404, `The board ID ${boardId} was not found`);

  res.status(200).json({
    message: "The operation was successfully completed",
    data: board,
  });
});

export default fetchBoard;
