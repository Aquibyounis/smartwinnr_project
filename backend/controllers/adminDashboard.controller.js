const User = require("../models/User");

const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalUsers: totalUsers,
    });
  } catch (error) {
    console.log("Error fetching total users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRecentUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })   // newest first
      .limit(5)                  // last 5 users
      .select("name email createdAt"); // hide password

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log("Error fetching recent users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserSignupStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json({
      stats,
    });
  } catch (error) {
    console.log("Error fetching signup stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const Sale = require("../models/Sale");

const getTotalSales = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({
      totalSales: result[0]?.totalRevenue || 0,
    });
  } catch (error) {
    console.log("Error fetching total sales:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMonthlySales = async (req, res) => {
  try {
    const stats = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json({ stats });
  } catch (error) {
    console.log("Error fetching sales stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getTotalUsers, getRecentUsers, getUserSignupStats, getTotalSales, getMonthlySales};
