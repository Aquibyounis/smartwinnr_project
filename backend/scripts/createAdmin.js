require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      adminId: "admin",
      password: hashedPassword,
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("Admin creation failed", err);
    process.exit(1);
  }
};

createAdmin();
