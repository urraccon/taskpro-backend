import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel, cardModel, columnModel } from "../../models/index.js";

const deleteCard = ctrlWrapper(async (req, res, next) => {
  const { cardId } = req.params;
  const card = await cardModel.findByIdAndDelete(cardId);

  if (!card) throw httpError(404, `The card ID ${cardId} was not found`);

  const columnId = card.columnId;
  const boardId = card.boardId;
  const column = await columnModel.findById(columnId);
  const board = await boardModel.findById(boardId);
  const updatedColumnCardIdList = column.cardIdList.filter(
    (id) => id.toString() !== cardId
  );
  const updatedBoardCardIdList = board.cardIdList.filter(
    (id) => id.toString() !== cardId
  );

  await columnModel.findByIdAndUpdate(columnId, {
    cardIdList: updatedColumnCardIdList,
  });

  await boardModel.findByIdAndUpdate(boardId, {
    cardIdList: updatedBoardCardIdList,
  });

  res.status(204).send();
});

export default deleteCard;
