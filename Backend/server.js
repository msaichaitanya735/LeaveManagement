const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT= process.env.PORT||8000
const router = require('./routes/auth')
const userdata = require('./routes/userleaves')
app.use(express.json())
app.use(cors())



mongoose.connect("mongodb://admin:12345@cluster0-shard-00-00.ea3td.mongodb.net:27017,cluster0-shard-00-01.ea3td.mongodb.net:27017,cluster0-shard-00-02.ea3td.mongodb.net:27017/LeaveManagement?ssl=true&replicaSet=atlas-k7lqec-shard-0&authSource=admin&retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("MongoDB is connected"))
.catch(err=>{
    console.log(err);
})

// app.use("/",require('./router'))
app.use('/api/auth',router)
app.use('/api/user',userdata)

app.get('/hi',(req,res)=>{
    res.send('Hello');
    console.log("reached")
})

const server = app.listen(PORT,()=>console.log("App is running on port:",PORT))

// process.on("unhandledRejection",(err,promise)=>{
//     console.log(`Logged Error:${err}`);
//     server.close(()=>process.exit(1));
// })