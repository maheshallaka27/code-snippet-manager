import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  searchSnippet,
  filterLanguage,
  filterTag,
  toggleFavorite,
  getFavouriteSnippets,
  togglePublicVisibility,
  getPublicSnippets,
  incrementViewCount,
  incrementCopyCount,
} from "../controllers/snippetController.js";
const router = express.Router();

router.post("/", protect, createSnippet);
router.get("/search", protect, searchSnippet);
router.get("/filter/language", protect, filterLanguage);
router.get("/filter/tag", protect, filterTag);
router.get("/favorites", protect, getFavouriteSnippets);
router.get("/public", getPublicSnippets);
router.get("/", protect, getAllSnippets);
router.patch("/:id/favorite", protect, toggleFavorite);
router.patch("/:id/public", protect, togglePublicVisibility);
router.patch("/:id/view", incrementViewCount);
router.patch("/:id/copy", incrementCopyCount);
router.get("/:id", protect, getSnippetById);
router.put("/:id", protect, updateSnippet);
router.delete("/:id", protect, deleteSnippet);

export default router;
