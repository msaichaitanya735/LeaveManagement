const { json } = require('express');
const User = require('../modules/user');

exports.register = async(req,res,next)=>{
    const {userid, email, password}=req.body;
    try {
       const user = await User.create({
           userid, email,password
       })
        // res.status(201).json({
        //     success: true,
        //     user,
        // });
        sendToken(user,201,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

exports.login = async(req,res,next)=>{
    const { email, password}= req.body;
    if(!email||!password){
        res.status(400).json({
            success: false,
            error: "Please provide email and password"
        })
    }
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user){
            res.send(404).json({
                success:false,
                error: "Invalid credentials"
            })
        }

        const isMatch = await user.matchPasswords(password)
        if(!isMatch){
            res.status(404).json({
                success: false,
                error: "Invalid credentials"
            })
        }
        
        // res.status(200).json({
        //     success: true,
        //     token:"sdfhgiosjoo42"
        // })
        sendToken(user,200,res);

    } catch (error) {
        res.status(500).json({
            success: false,
            error:error.message
        })
    }
}

exports.forgotpassword = (req,res,next)=>{
    res.send("Forgot Password Route");
}

exports.resetpassword = (req,res,next)=>{
    res.send("Reset Password Route");
}

exports.lastlogin=async(req,res,next)=>{
    const date = String(Date.now())
    console.log(date)
    const lastlog = await User.findByIdAndUpdate({_id:req.query.id},{
        lastlogin:String(Date.now())
    })
    lastlog.save()
    res.send(lastlog)
}

const sendToken = (user, statusCode, res)=>{
    const token = user.getSignedToken()
    const userid = user.userid
    const email = user.email
    const admin = user.admin
    const id = user._id
    const lastlogin = user.lastlogin
    res.status(statusCode).json({sucess:true,token,userid,email,admin,id,lastlogin})
}