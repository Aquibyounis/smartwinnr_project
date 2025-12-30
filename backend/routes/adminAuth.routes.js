const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth.middleware");

const { getTotalUsers,getRecentUsers, getUserSignupStats, getTotalSales, getMonthlySales} = require("../controllers/adminDashboard.controller");
const { adminLogin } = require("../controllers/adminAuth.controller");

router.post("/login", adminLogin);
router.get("/total-users", adminAuth, getTotalUsers);
router.get("/recent-users", adminAuth, getRecentUsers);
router.get("/user-signups", adminAuth, getUserSignupStats);
router.get("/total-sales", adminAuth, getTotalSales);
router.get("/monthly-sales", adminAuth, getMonthlySales);

router.get("/test", adminAuth, (req, res) => {
    res.json({
        message: "Admin protected route accessed",
    admin: req.admin,
  });
});

module.exports = router;
