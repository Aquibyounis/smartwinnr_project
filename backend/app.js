const express=require("express");
const cors=require("cors");
const app=express();
const UserAuthRouter=require("./routes/userAuth.routes");
const AdminAuthRouter=require("./routes/adminAuth.routes");

app.use(cors());
app.use(express.json());

app.use("/api/users",UserAuthRouter);
app.use("/api/admin",AdminAuthRouter);

app.get("/",(req,res)=>{
    res.send("API IS RUNNING");
})

module.exports = app;