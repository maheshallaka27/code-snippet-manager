import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getDashboardStats,
  getRecentSnippets,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);

router.get("/recent-snippets", protect, getRecentSnippets);

export default router;
