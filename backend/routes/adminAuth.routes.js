const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth.middleware");

const {
  getTotalUsers,
  getRecentUsers,
  getUserSignupStats,
  getTotalSales,
  getSalesStats,
  getUserStats
} = require("../controllers/adminDashboard.controller");

const { adminLogin } = require("../controllers/adminAuth.controller");

router.post("/login", adminLogin);

router.get("/total-users", adminAuth, getTotalUsers);
router.get("/recent-users", adminAuth, getRecentUsers);
router.get("/user-stats", adminAuth, getUserStats);
router.get("/total-sales", adminAuth, getTotalSales);

router.get("/sales-stats", adminAuth, getSalesStats);

module.exports = router;
