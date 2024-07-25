import { model, Schema } from "mongoose";

const columnModel = new Schema(
  {
    title: {
      type: String,
      required: [true, "The title field cannot be empty"],
    },
    cardIdList: {
      type: Array,
      default: [],
    },
    boardId: {
      type: String,
      required: [
        true,
        "The column must be associated with a board to perform this operation",
      ],
    },
    userId: {
      type: String,
      required: [
        true,
        "The column must be associated with a user to perform this operation",
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("column", columnModel);
