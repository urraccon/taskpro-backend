import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { cardModel } from "../../models/index.js";

const fetchCard = ctrlWrapper(async (req, res, next) => {
  const { cardId } = req.params;
  const card = await cardModel.findById(cardId);

  if (!card) throw httpError(404, `The card ID ${cardId} was not found`);

  res.status(200).json({
    message: "The operation was successfully completed",
    data: card,
  });
});

export default fetchCard;
