import mongoose from "mongoose";
import Snippet from "./Snippets";

const versionSchema = new mongoose.Schema(
  {
    snippet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippet",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Version = mongoose.model("Version", versionSchema);

export default Version;
