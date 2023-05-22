const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGOURI} = require("./keys")
const port = 8000;
app.use(express.json())

// const middleware = (req,res,next)=>{
//     console.log("Middleware Executed...");
//     next()
// }
// If we want any middle ware to get executed for every route then use it in following way...
// app.use(middleware);


// app.get('/',(req,res)=>{
//     res.send("Hello world")
// })
// // If we want any middle ware to get executed only for any specific route then use it in following way...
// app.get('/about',middleware,(req,res)=>{
//     res.send("About Page")
// })


mongoose.set('strictQuery', false)
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected',()=>{
    console.log("Connected to Database")
})

require("./models/user")
require("./models/post")

app.use(require("./routes/auth"))
app.use(require("./routes/post"))


app.listen(port,()=>{
    console.log("Server is running on ",port)
})