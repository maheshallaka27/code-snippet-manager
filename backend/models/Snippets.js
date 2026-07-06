import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
    tags: [{ type: String }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    copyCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
const Snippet = mongoose.model("Snippet", snippetSchema);
export default Snippet;
