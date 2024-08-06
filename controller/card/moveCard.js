import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { cardModel, columnModel } from "../../models/index.js";
import { ObjectId } from "mongodb";

const moveCard = ctrlWrapper(async (req, res, next) => {
  const { cardId } = req.params;
  const card = await cardModel.findById(cardId);

  if (!card) throw httpError(404, `The card ID ${cardId} was not found`);

  const moveToColumnId = req.body.columnId;
  const moveFromColumnId = card.columnId;

  if (moveToColumnId === moveFromColumnId)
    throw httpError(400, `The card ID ${cardId} has not moved`);

  const moveToColumn = await columnModel.findById(moveToColumnId);

  if (!moveToColumn)
    throw httpError(404, `The column ID ${moveToColumnId} was not found`);

  const moveFromColumn = await columnModel.findById(moveFromColumnId);
  const updatedMoveFromColumnCardIdList = moveFromColumn.cardIdList.filter(
    (id) => id.toString() !== cardId
  );

  await columnModel.findByIdAndUpdate(moveFromColumnId, {
    cardIdList: updatedMoveFromColumnCardIdList,
  });

  const objectIdCard = new ObjectId(cardId);

  const updatedMoveToColumnCardIdList = [
    ...moveToColumn.cardIdList,
    objectIdCard,
  ];

  await columnModel.findByIdAndUpdate(moveToColumn, {
    cardIdList: updatedMoveToColumnCardIdList,
  });

  const updatedCard = await cardModel.findByIdAndUpdate(
    cardId,
    {
      columnId: moveToColumnId,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    message: "The operation was successfully completed",
    data: updatedCard,
  });
});

export default moveCard;
