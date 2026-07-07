import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getVersionHistory,
  restoreVersion,
} from "../controllers/versionController.js";
const router = express.Router();
router.get("/:snippetId", protect, getVersionHistory);
router.post("/:versionId/restore", protect, restoreVersion);

export default router;
