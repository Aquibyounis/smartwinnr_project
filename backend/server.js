require("dotenv").config();
const app=require("./app")
const port=process.env.PORT || 5000
const connectDB=require("./config/db")

app.listen(port,()=>{
  console.log("server is running on port ",port);
  connectDB();
});