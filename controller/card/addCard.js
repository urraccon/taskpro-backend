import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel, cardModel, columnModel } from "../../models/index.js";

const addCard = ctrlWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const { title, columnId } = req.body;
  const column = await columnModel.findById(columnId);

  if (!column) throw httpError(404, `The column ID ${columnId} was not found`);

  const card = await cardModel.findOne({ title, columnId });

  if (card) throw httpError(409, `A card named ${title} already exists`);

  const boardId = column.boardId;
  const createdCard = await cardModel.create({ ...req.body, boardId, userId });
  const columnCardIdList = column.cardIdList;
  columnCardIdList.push(createdCard._id);

  await columnModel.findByIdAndUpdate(columnId, {
    cardIdList: columnCardIdList,
  });

  const board = await boardModel.findById(boardId);
  const boardCardIdList = board.cardIdList;
  boardCardIdList.push(createdCard._id);

  await boardModel.findByIdAndUpdate(boardId, {
    cardIdList: boardCardIdList,
  });

  res.status(201).json({
    messgae: "The operation was successfully completed",
    data: createdCard,
  });
});

export default addCard;
