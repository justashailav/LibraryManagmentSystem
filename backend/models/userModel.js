import  mongoose from "mongoose"
import jwt from "jsonwebtoken"
import crypto from "crypto"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    },
    accountVerified:{
        type:Boolean,
        default:false
    },
    borrowedBooks:[
        {
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Borrow"
            },
            returned:{
                type:Boolean,
                default:false
            },
            bookTitle:String,
            borrowedDate:Date,
            dueDate:Date,

        }
    ],
    avatar:{
        public_id:String,
        url:String
    },
    verificationCode:Number,
    verificationCodeExpires:Date,
    resetPasswordToken:String,
    resetPasswordExpires:Date,
},{timestamps:true})

userSchema.methods.generateVerificatinCode=function(){
    function generateFiveDigitNumber(){
        const firstDigit=Math.floor(Math.random()*9)+1;
        const remainingDigits=Math.floor(Math.random()*1000).toString().padStart(4,0);
        return parseInt(firstDigit + remainingDigits);
    }
    const verificationCode=generateFiveDigitNumber();
    this.verificationCode=verificationCode;
    this.verificationCodeExpires=Date.now()+15*60*1000;
    return verificationCode; 
}
userSchema.methods.generateToken=function(){
    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
userSchema.methods.getResetPasswordToken=function(){
   const resetToken=crypto.randomBytes(20).toString("hex");
   this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
   this.resetPasswordExpires=Date.now()+15*60*1000;
   return resetToken
}
export const User=mongoose.model("User",userSchema)