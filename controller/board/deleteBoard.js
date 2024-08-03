import { ctrlWrapper, httpError } from "../../helpers/index.js";
import {
  boardModel,
  cardModel,
  columnModel,
  userModel,
} from "../../models/index.js";

const deleteBoard = ctrlWrapper(async (req, res, next) => {
  const { boardId } = req.params;
  const board = await boardModel.findByIdAndDelete(boardId);

  if (!board) throw httpError(404, `The board ID ${boardId} was not found`);

  await columnModel.deleteMany({ boardId });
  await cardModel.deleteMany({ boardId });

  const userId = req.user.id;
  const boardList = await boardModel.find({ userId });
  if (boardList.length !== 0) {
    const firstBoardId = boardList[0]._id;

    await userModel.findByIdAndUpdate(userId, {
      activeBoard: firstBoardId,
    });
  } else {
    await userModel.findByIdAndUpdate(userId, {
      activeBoard: null,
    });
  }

  res.status(204).send();
});

export default deleteBoard;
