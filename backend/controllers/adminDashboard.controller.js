const User = require("../models/User");
const Sale = require("../models/Sale");

/* ---------------- USERS ---------------- */

const getTotalUsers = async (req, res) => {
  const totalUsers = await User.countDocuments();
  res.json({ totalUsers });
};

const getRecentUsers = async (req, res) => {
  const users = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name email createdAt");

  res.json({ users });
};

const getUserSignupStats = async (req, res) => {
  const stats = await User.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  res.json({ stats });
};

/* ---------------- SALES ---------------- */

const getTotalSales = async (req, res) => {
  const result = await Sale.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  res.json({ totalSales: result[0]?.total || 0 });
};

/**
 * ✅ ONE API FOR ALL CHART MODES
 * daily   → last 30 days
 * monthly → 12 months
 * yearly  → last 5 years
 */
const getSalesStats = async (req, res) => {
  const type = req.query.type || "monthly";
  let pipeline = [];

  if (type === "daily") {
    pipeline = [
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30))
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ];
  }

  if (type === "monthly") {
    pipeline = [
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ];
  }

  if (type === "yearly") {
    pipeline = [
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1 } }
    ];
  }

  const stats = await Sale.aggregate(pipeline);
  res.json({ stats });
};

module.exports = {
  getTotalUsers,
  getRecentUsers,
  getUserSignupStats,
  getTotalSales,
  getSalesStats
};
