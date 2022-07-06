const express = require ('express');
const router = express.Router();
// const { protect } = require('../middleware/auth')

const User = require('../modules/user');

const sendToken = (user, statusCode, res)=>{
    const token = user.getSignedToken()
    const userid = user.userid
    const email = user.email
    const admin = user.admin
    const id = user._id
    const lastlogin = user.lastlogin
    res.status(statusCode).json({sucess:true,token,userid,email,admin,id,lastlogin})
}

const {register, forgotpassword, login, resetpassword, lastlogin} = require('../controllers/auth');

router.route('/register').post(register);

router.post('/login',async(req,res)=>{
    
    const { email, password}= req.body;
    if(!email||!password){
        return res.status(400).json({
            success: false,
            error: "Please provide email and password"
        })
    }
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.send(404).json({
                success:false,
                error: "Invalid credentials"
            })
        }

        const isMatch = await user.matchPasswords(password)
        if(!isMatch){
            return res.status(404).json({
                success: false,
                error: "Invalid credentials"
            })
        }
        
        // res.status(200).json({
        //     success: true,
        //     token:"sdfhgiosjoo42"
        // })
        console.log('login reached')
        sendToken(user,200,res);

    } catch (error) {
        return res.status(500).json({
            success: false,
            error:error.message
        })
    }
})

router.route('/forgotpassword').post(forgotpassword)

router.route('/resetpassword/:resetToken').put(resetpassword)

router.get('/get',(req,res)=>{
    res.send("heeeellloo");
    console.log('ehi');
})

// router.route('/lastlogin').put(lastlogin)
module.exports = router;