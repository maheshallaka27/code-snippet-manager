import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
} from "../controllers/snippetController.js";
const router = express.Router();

router.post("/snippets", protect, createSnippet);
router.get("/snippets", protect, getAllSnippets);
router.get("/snippets/:id", protect, getSnippetById);
router.put("/snippets/:id", protect, updateSnippet);
router.delete("/snippets/:id", protect, deleteSnippet);

export default router;
