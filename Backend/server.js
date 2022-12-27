const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const app = express();
var cors = require('cors')
const {URL,PORT} = require("./config/config");
const {notFound , errorHandler} = require("./middleware/errorMiddleware");

// app.use("/",(req,res,next)=>{
//     res.send("hello nikunj");
// })
// app.listen(5000,()=>console.log("connetced"));
app.use(cors())
app.use(express.json())
app.use("/api",router)

app.use(notFound);
app.use(errorHandler);
const connectDB = async () =>{
    try{
        let conn  = await mongoose.connect(URL);
        console.log(`Mongoose Connected : ${conn}`);
    }catch(err){
        console.log(`Error : ${err}`)
        process.exit();
    }
}
connectDB();
app.listen(PORT);