import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  explainCode,
  optimizeCode,
  findBugs,
  analyzeComplexity,
  generateTestCases,
  convertLanguage,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/explain", protect, explainCode);
router.post("/optimize", protect, optimizeCode);
router.post("/bugs", protect, findBugs);
router.post("/complexity", protect, analyzeComplexity);
router.post("/testcases", protect, generateTestCases);
router.post("/convert", protect, convertLanguage);
export default router;
