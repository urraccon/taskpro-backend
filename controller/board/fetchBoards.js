import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel } from "../../models/index.js";

const fetchBoards = ctrlWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const boardList = await boardModel.find({ userId });

  if (boardList.length === 0) {
    throw httpError(404, `No board was found for user ID ${userId}`);
  }

  res.status(200).json({
    message: "The operation was successfully completed",
    data: boardList,
  });
});

export default fetchBoards;
