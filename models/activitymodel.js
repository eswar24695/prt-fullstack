const mongoose=require("mongoose")
const activitySchema=new mongoose.Schema({
    Activity:{type:String},
    status:{type:String,default:"pending"},
    userid:{type:String,ref:"Users"}
})
const Activitymodel=mongoose.model("activities",activitySchema);
module.exports=Activitymodel;