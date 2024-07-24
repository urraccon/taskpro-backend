import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { columnModel } from "../../models/index.js";

const fetchColumn = ctrlWrapper(async (req, res, next) => {
  const { columnId } = req.params;
  const column = await columnModel.findById(columnId);

  if (!column) throw httpError(404, `The column ID ${columnId} was not found`);

  res.status(200).json({
    message: "The operation was successfully completed",
    data: column,
  });
});

export default fetchColumn;
