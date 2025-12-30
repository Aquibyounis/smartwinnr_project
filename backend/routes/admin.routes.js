const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/stats", auth, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });

  res.json({
    totalUsers,
    activeUsers,
    newSignups: 7,
    totalSales: 12000
  });
});

router.get("/users", auth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
