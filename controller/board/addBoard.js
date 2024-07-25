import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { boardModel } from "../../models/index.js";

const addBoard = ctrlWrapper(async (req, res, next) => {
  const { title } = req.body;
  const userId = req.user.id;
  const board = await boardModel.findOne({ title, userId });

  if (board) throw httpError(409, `A project named ${title} already exists`);

  const createdBoard = await boardModel.create({ ...req.body, userId });

  res.status(201).json({
    message: "The operation was successfully completed",
    data: createdBoard,
  });
});

export default addBoard;
