const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{type:String,require:true,unique:true},
    password:{type:String}
})
const Users=mongoose.model("users",userSchema);
module.exports=Users;