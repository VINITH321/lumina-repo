import { Router } from "express";
import { signup, signin, getMe } from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = Router();

// Public
router.post("/signup", signup);
router.post("/signin", signin);

// Protected (requires Authorization: Bearer <token>)
router.get("/me", protect, getMe);

export default router;

