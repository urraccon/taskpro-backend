import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { cardModel } from "../../models/index.js";

const fetchCards = ctrlWrapper(async (req, res, next) => {
  const { columnId } = req.body;
  const cardList = await cardModel.find({ columnId });

  if (cardList.length === 0) {
    throw httpError(404, `No card was found for column ID ${columnId}`);
  }

  res.status(200).json({
    message: "The operation was successfully completed",
    data: cardList,
  });
});

export default fetchCards;
