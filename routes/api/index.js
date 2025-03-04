const express = require("express");
const router = express.Router();

const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");
const reactionRoutes = require("./reactionRoutes");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);
router.use("/reactions", reactionRoutes);

module.exports = router; 
