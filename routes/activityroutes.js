const router=require("express").Router();
const bodyparser=require("body-parser");
const Activitymodel=require("../models/activitymodel");
router.use(bodyparser.json());
router.post("/tasks/addtask",async(req,res)=>{
    const {Activity}=req.body;
    console.log("Hitting");
    try{
        let postdata=await Activitymodel.create({
            Activity:Activity,
            userid:req.user
        })
        return res.json({
            postdata
        })
    }
    catch(e){
        return res.json({
            message:e.message
        })
    }
})
router.get('/tasks/all',async(req,res)=>{
    try{
        let data=await Activitymodel.find({userid:req.user})
        return res.json({
            data
        })
    }
    catch(e){
        return res.json({
            message:e.message
        })
    }
})
module.exports=router