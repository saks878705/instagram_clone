const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const {SECRETKEY} = require('../keys')

module.exports = async (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.json({ status: false, message: "Token is required" });
    let x = token.split(".");
    if (x.length < 3) return res.send({ status: false, message: "Invalid token" });
    var decodedToken = jwt.verify(token,SECRETKEY);
    var user_id = decodedToken.user_id;
    let user_data = await User.findOne({_id:user_id});
    req.user = user_data;
    next();
}