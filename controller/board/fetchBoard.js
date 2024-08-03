import { ctrlWrapper, httpError } from "../../helpers/index.js";
import {
  boardModel,
  cardModel,
  columnModel,
  userModel,
} from "../../models/index.js";

const fetchBoard = ctrlWrapper(async (req, res, next) => {
  const { boardId } = req.params;
  const board = await boardModel.findById(boardId);

  if (!board) throw httpError(404, `The board ID ${boardId} was not found`);

  const columnList = await Promise.all(
    board.columnIdList.map(async (columnId) => {
      const column = await columnModel.findById(columnId);
      const cardList = await Promise.all(
        column.cardIdList.map(
          async (cardId) => await cardModel.findById(cardId)
        )
      );
      const updatedColumn = {
        column,
        cardList,
      };

      return updatedColumn;
    })
  );

  const updatedBoard = {
    ...board._doc,
    columnList,
  };

  const userId = req.user.id;
  await userModel.findByIdAndUpdate(userId, {
    activeBoard: boardId,
  });

  res.status(200).json({
    message: "The operation was successfully completed",
    data: updatedBoard,
  });
});

export default fetchBoard;
