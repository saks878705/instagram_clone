const router = require("express").Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const {SECRETKEY} = require('../keys');
// const requirelogin = require('../middleware/login')

// router.get('/protected',requirelogin,(req,res)=>{
//     res.send(`Hello ${req.user.name}`)
// })

router.post('/signUp',async (req,res)=>{
    console.log(req.body);
    const {name,email,password} = req.body;
    if(!email || !password || !name) return res.json({status:false,message:"Please provide all the fields"})
    let user_info = await User.findOne({email});
    if(user_info) return res.json({status:false,message:"User already exist"});
    try {
        const hashed_password = await bcrypt.hash(password,12)
        const new_user =await User.create({
            email,
            password:hashed_password,
            name,
        })
        return res.json({status:true,message:"Posted successfully",result:new_user})
    } catch (error) {
        console.log(error)
    }

});

router.post('/signIn',async (req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    if(!email || !password ) return res.json({status:false,message:"Please provide the details"})
    let user_info = await User.findOne({email});
    if(!user_info) return res.json({status:true,message:"Please provide a valid mailId"});
    let result = await bcrypt.compare(password,user_info.password)
    const token = jwt.sign({user_id:user_info._id},SECRETKEY)
    if(result){return res.json({status:true,message:"Succesfully logged in.",result:{token:token,user:{_id:user_info._id,name:user_info.name,email:user_info.email}}}) }
    else{return res.json({status:false,message:"Password didn't matched."})}
})

module.exports = router;