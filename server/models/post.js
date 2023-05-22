const mongoose = require("mongoose");

const postSchema= new mongoose.Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    photo:{
        type:String,
        default:"No photo"
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
});

module.exports = mongoose.model("Post",postSchema)