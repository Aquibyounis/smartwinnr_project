const User=require("../models/User")
const bcrypt=require("bcryptjs")

const signup =async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({"message":"All fields are mandetory"});
        }
        const exist_user=await User.findOne({email});
        if(exist_user){
            return res.status(400).json({"message":"mail is already in use."});
        }

        const e_password=await bcrypt.hash(password,10);

        await User.create({
            name,
            email,
            password:e_password
        });

        res.status(200).json({"message":"User Successfully created"});
    }catch(error){
        console.log(`Error in signing up the user: ${error}`);
    }
}

module.exports={signup};