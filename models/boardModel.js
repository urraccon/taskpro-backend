import { model, Schema } from "mongoose";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The title field cannot be empty"],
    },
    icon: {
      type: String,
      enum: [
        "project",
        "star",
        "loading",
        "puzzle-piece",
        "container",
        "lightning",
        "colors",
        "hexagon",
      ],
      default: "project",
    },
    background: {
      type: String,
      enum: [
        "no-background",
        "flowers",
        "stars",
        "tree",
        "half-moon",
        "leaves",
        "cloud",
        "coast",
        "figure",
        "full-moon",
        "boat",
        "hot-air-ballon",
        "canyon",
        "ocean",
        "hot-air-ballons",
        "northern-lights",
      ],
      default: "no-background",
    },
    columnIdList: {
      type: Array,
      default: [],
    },
    cardIdList: {
      type: Array,
      default: [],
    },
    userId: {
      type: String,
      required: [
        true,
        "The board must be associated with a user to perform this operation",
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("board", boardSchema);
