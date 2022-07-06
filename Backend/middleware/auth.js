const jwt = require('jsonwebtoken')
const User = require('../modules/user');
const { use } = require('../routes/auth');

exports.protect = async (req,res,next)=>{
    let token;
        // if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //     token= req.headers.authorization.split(" ")[1]
        // }

        // if(!token){
        //     res.status(401).json({
        //         success:false,
        //         error:"Not authorized to access the block"
        //     })
        // }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if(!user){
            res.status(404).json({
                success:false,
                error:"No user found with this id"
            })
        }
        req.user = user
        next();

    } catch (error) {
        res.status(401).json({
            success:false,
            error: error.message
        })
    }
}