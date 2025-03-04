import express from "express";
import { addReaction, getReactions, deleteReaction } from "../../controllers/reactionController.js";

const router = express.Router();

router.get("/", getReactions);


router.post("/", addReaction);


router.delete("/:reactionId", deleteReaction);

export default router;
