import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel, columnModel } from "../../models/index.js";

const addColumn = ctrlWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const { title, boardId } = req.body;
  const board = await boardModel.findById(boardId);

  if (!board) throw httpError(404, `The board ID ${boardId} was not found`);

  const column = await columnModel.findOne({ title, boardId });

  if (column) throw httpError(409, `A column named ${title} already exists`);

  const createdColumn = await columnModel.create({ ...req.body, userId });
  const columnIdList = board.columnIdList.push(createdColumn._id);

  await boardModel.findByIdAndUpdate(boardId, {
    columnIdList,
  });

  res.status(201).json({
    message: "The operation was successfully completed",
    data: createdColumn,
  });
});

export default addColumn;
