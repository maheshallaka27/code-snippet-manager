import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    snippets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Snippet",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
