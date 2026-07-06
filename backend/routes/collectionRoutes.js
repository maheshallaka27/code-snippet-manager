import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  addSnippetToCollection,
  removeSnippetFromCollection,
} from "../controllers/collectionController.js";
const router = express.Router();
router.post("/", protect, createCollection);
router.get("/", protect, getCollections);
router.get("/:id", protect, getCollectionById);
router.put("/:id", protect, updateCollection);
router.delete("/:id", protect, deleteCollection);
router.post(
  "/:collectionId/snippets/:snippetId",
  protect,
  addSnippetToCollection,
);
router.delete(
  "/:collectionId/snippets/:snippetId",
  protect,
  removeSnippetFromCollection,
);
export default router;
