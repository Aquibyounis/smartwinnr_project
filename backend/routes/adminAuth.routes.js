const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth.middleware");

const {
  getTotalUsers,
  getRecentUsers,
  getUserSignupStats,
  getTotalSales,
  getSalesStats
} = require("../controllers/adminDashboard.controller");

const { adminLogin } = require("../controllers/adminAuth.controller");

router.post("/login", adminLogin);

router.get("/total-users", adminAuth, getTotalUsers);
router.get("/recent-users", adminAuth, getRecentUsers);
router.get("/user-signups", adminAuth, getUserSignupStats);
router.get("/total-sales", adminAuth, getTotalSales);

/**
 * NEW: dynamic stats
 * /sales-stats?type=daily | monthly | yearly
 */
router.get("/sales-stats", adminAuth, getSalesStats);

module.exports = router;
