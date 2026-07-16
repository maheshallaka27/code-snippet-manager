import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { explainCode } from "../controllers/aiController.js";

const router = express.Router();

router.post("/explain", protect, explainCode);

export default router;
