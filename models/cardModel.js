import dayjs from "dayjs";
import { model, Schema } from "mongoose";

const now = dayjs().format("YYYY-MM-DD");

const cardModel = new Schema(
  {
    title: {
      type: String,
      required: [true, "The title field cannot be empty"],
    },
    description: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["without", "low", "medium", "high"],
      default: "without",
    },
    deadline: {
      type: Date,
      default: now,
    },
    columnId: {
      type: String,
      required: [
        true,
        "The card must be associated with a column to perform this operation",
      ],
    },
    boardId: {
      type: String,
      required: [
        true,
        "The card must be associated with a board to perform this operation",
      ],
    },
    userId: {
      type: String,
      required: [
        true,
        "The card must be associated with a user to perform this operation",
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("card", cardModel);
