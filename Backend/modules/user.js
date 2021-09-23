const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    userid:{
        type: String,
        required:[true, "Please provide a username"],
        unique: true
    },
    admin:{
        type: String,
    },
    email:{
        type: String,
        required:[true, "Please provide a email"],
        unique: true,
        match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Plese enter a valid email id"]
    },
    password:{
        type: String,
        required:[true,"Please add a password"],
        minlength: 6,
        select: false
    },
    leaves:{
        type: String,
    },
    lastlogin:{
        type: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();     
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

UserSchema.methods.matchPasswords = async function(password){
    return bcrypt.compare(password,this.password);
}

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE})
}

const User = mongoose.model("UserTable",UserSchema)

module .exports = User