const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const Admin= require("../models/Admin");
const jwt=require("jsonwebtoken");


const adminLogin = async (req,res)=>{
    try{
        const {adminId,password} = req.body;
        if (!adminId || !password){
            return res.status(400).json({"message":"All fields are mandetory"});
        }
        const admin=await Admin.findOne({adminId});

        if(!admin){
            return res.status(401).json({"message":"Invalid Credinatials"});
        }
        const same_password=await bcrypt.compare(password,admin.password);
        if(!same_password){
            return res.status(401).json({"message":"Password Dismatch :("})
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: "admin",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({message:"password MATCHED :)",token: token})
    }catch(error){
        console.log(`Error in admin login in: ${error}`);
    }
};


module.exports={adminLogin};