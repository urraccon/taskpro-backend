import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel, cardModel, columnModel } from "../../models/index.js";

const deleteBoard = ctrlWrapper(async (req, res, next) => {
  const { boardId } = req.params;
  const board = await boardModel.findByIdAndDelete(boardId);

  if (!board) throw httpError(404, `The board ID ${boardId} was not found`);

  await columnModel.deleteMany({ boardId });
  await cardModel.deleteMany({ boardId });

  res.status(204).send();
});

export default deleteBoard;
