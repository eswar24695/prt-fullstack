const express=require("express");
const app=express();
var jwt=require("jsonwebtoken");
const cors=require("cors")
const userRoutes=require("./routes/userRoutes");
const taskRoutes=require("./routes/activityroutes")
app.use(cors());
app.use(express.json());
app.use('/tasks', (req, res, next) => {
    try {
        const token = req.headers.token;
        console.log(token);
        if (token) {
            const decoded = jwt.verify(token, 'jwt_secret_key');
            req.user = decoded.id;
            next();
        }
        else {
            res.status(401).json({
                status: "failed",
                message: "token is missing"
            })
        }

    } catch (e) {
        res.status(401).json({
            status: "failed",
            message: e.message
        })
    }

})
app.use("/",userRoutes);
app.use("/",taskRoutes);

module.exports=app;
