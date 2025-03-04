import express from "express";
import thoughtRoutes from "./thoughtRoutes.js";
import userRoutes from "./userRoutes.js";
import reactionRoutes from "./reactionRoutes.js"; // <-- Import Reaction Routes

const router = express.Router();

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);
router.use("/reactions", reactionRoutes); // <-- Add Reactions Route

export default router;
