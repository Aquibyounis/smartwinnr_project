require("dotenv").config();
const mongoose = require("mongoose");
const Sale = require("../models/Sale");

const createMockSales = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Sale.insertMany([
      { amount: 500 },
      { amount: 1200 },
      { amount: 800 },
      { amount: 1500 },
      { amount: 300 },
    ]);

    console.log("Mock sales data inserted");
    process.exit();
  } catch (err) {
    console.error("Error inserting mock sales:", err);
    process.exit(1);
  }
};

createMockSales();
