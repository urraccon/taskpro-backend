import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel } from "../../models/index.js";

const updateBoard = ctrlWrapper(async (req, res, next) => {
  const { boardId } = req.params;
  let { title, icon, background } = req.body;
  const board = await boardModel.findById(boardId);

  if (!board) throw httpError(404, `The board ID ${boardId} was not found`);

  if (title === undefined) {
    title = board.title;
  }

  if (icon === undefined) {
    icon = board.icon;
  }

  if (background === undefined) {
    background = board.background;
  }

  if (
    title !== board.title ||
    icon !== board.icon ||
    background !== board.background
  ) {
    const updatedBoard = await boardModel.findByIdAndUpdate(
      boardId,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "The operation was successfully compeleted",
      data: updatedBoard,
    });
  } else {
    throw httpError(400, `The board ID ${boardId} has not changed`);
  }
});

export default updateBoard;
