const router = require("express").Router()
const mongoose = require("mongoose")
const Post = mongoose.model("Post")
const requirelogin = require("../middleware/login")

router.post('/create_post', requirelogin, async (req, res) => {
    try {
        const { title, body,photo } = req.body;
        if (!title || !body) return res.json({ status: false, message: "Please fill the required fields" });
        const new_post = await Post.create({
            title,
            body,
            photo,
            postedBy: req.user._id
        })
        if (new_post) res.json({ status: true, message: "Successfully posted",result:new_post })
    } catch (error) {
        console.log(error)
    }
})

router.get('/get_all_posts',async (req,res)=>{
    let post_data = await Post.find().populate('postedBy',"_id name")
    if(post_data.length<1) return res.json({status:true,message:"No data",result:[]})
    return res.json({status:true,message:"Get successfully",result:post_data})
});

router.get('/get_all_my_posts',requirelogin,async (req,res)=>{
    let post_data = await Post.find({postedBy:req.user._id}).populate('postedBy',"_id name")
    if(post_data.length<1) return res.json({status:true,message:"No data",result:[]})
    return res.json({status:true,message:"Get successfully",result:post_data})
});

module.exports = router;