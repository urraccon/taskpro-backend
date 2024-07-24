import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { columnModel } from "../../models/index.js";

const fetchColumns = ctrlWrapper(async (req, res, next) => {
  const { boardId } = req.body;
  const columnList = await columnModel.find({ boardId });

  if (columnList.length === 0) {
    throw httpError(404, `No column was found for board ID ${boardId}`);
  }

  res.status(200).json({
    message: "The operation was successfully completed",
    data: columnList,
  });
});

export default fetchColumns;
