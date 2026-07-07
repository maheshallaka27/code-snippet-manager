import mongoose from "mongoose";
import Snippet from "./Snippets.js";

const versionSchema = new mongoose.Schema(
  {
    snippet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snippet",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Version = mongoose.model("Version", versionSchema);

export default Version;
