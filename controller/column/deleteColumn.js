import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel, columnModel } from "../../models/index.js";

const deleteColumn = ctrlWrapper(async (req, res, next) => {
  const { columnId } = req.params;
  const column = await columnModel.findByIdAndDelete(columnId);

  if (!column) throw httpError(404, `The column ID ${columnId} was not found`);

  const boardId = column.boardId;
  const board = await boardModel.findById(boardId);
  const updatedColumnIdList = board.columnIdList.filter(
    (id) => id.toString() !== columnId
  );

  await boardModel.findByIdAndUpdate(boardId, {
    columnIdList: updatedColumnIdList,
  });

  await res.status(204).send();
});

export default deleteColumn;