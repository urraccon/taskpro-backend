import { ctrlWrapper, httpError } from "../../helpers/index.js";
import { cardModel } from "../../models/index.js";

const updateCard = ctrlWrapper(async (req, res, next) => {
  const { cardId } = req.params;
  let { title, description, priority, deadline } = req.body;
  const card = await cardModel.findById(cardId);

  if (!card) throw httpError(404, `The card ID ${cardId} was not found`);

  if (title === undefined) {
    title = card.title;
  }

  if (description === undefined) {
    description = card.description;
  }

  if (priority === undefined) {
    priority = card.priority;
  }

  if (deadline === undefined) {
    deadline = card.deadline;
  }

  if (
    title !== card.title ||
    description !== card.description ||
    priority !== card.priority ||
    deadline !== card.deadline
  ) {
    const updatedCard = await cardModel.findByIdAndUpdate(
      cardId,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "The operation was successfully completed",
      data: updatedCard,
    });
  } else {
    throw httpError(400, `The card ID ${cardId} has not changed`);
  }
});

export default updateCard;
