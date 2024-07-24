import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { columnModel } from "../../models/index.js";

const updateColumn = ctrlWrapper(async (req, res, next) => {
  const { columnId } = req.params;
  const { title } = req.body;
  const column = await columnModel.findById(columnId);

  if (!column) throw httpError(404, `The column ID ${columnId} was not found`);

  if (title !== undefined && title !== column.title) {
    const updatedColumn = await columnModel.findByIdAndUpdate(
      columnId,
      { title },
      { new: true }
    );

    res.status(200).json({
      message: "The operation was successfully completed",
      data: updatedColumn,
    });
  } else {
    throw httpError(400, `The column ID ${columnId} has not changed`);
  }
});

export default updateColumn;
