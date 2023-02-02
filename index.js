const app=require("./app");
const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config();
mongoose.connect("mongodb+srv://todo:prtjan30@cluster0.bjyakgl.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("connected to db");
})
app.listen(6800,()=>{
    console.log("server running at port 6800");
})