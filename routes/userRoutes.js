const router=require("express").Router();
const Users=require("../models/userModel");
const bodyparser=require("body-parser");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
router.use(bodyparser.json());
router.post('/register',async(req,res)=>{
    try{
        const{name,password}=req.body;
        const usercheck=await Users.findOne({name});
        if(usercheck){
            res.json({
                message:"Account already exists"
            })
        }else{
            const hash=await bcrypt.hash(password,10)
            const newUser=await Users.create({
                name:name,
                password:hash
            })
            res.json({
                status:"success",
                newuser:newUser
            })
        }
    }
    catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })

    }
})
router.post("/login",async(req,res)=>{
    try{
        const {name,password}=req.body;
        const userbyname=await Users.find({name});
        let user;
        if(userbyname.length){
            user=userbyname[0];
            var result=await bcrypt.compare(password,user.password)
        }else{
            res.status(404).json({
                status:"Failed",
                message:"User not existed"
            })
        }
        if(result){
            const token=jwt.sign({id:user._id},"jwt_secret_key",{expiresIn:"2h"});
            res.status(200).json({
                status:"success",
                token,
                user
            })
        }else{
            res.status(400).json({
                status:"Failed",
                message:"Incorrect password"
            })
        }

    }
    catch(e){

        res.status(401).json({
            status:"Failed",
            message:e.message
        })
    }
})
module.exports=router