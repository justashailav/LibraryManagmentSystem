import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplate.js";
import crypto from "crypto"
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const user = await User.findOne({ email, accountVerified: true });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const registrationAttemptsByUser = await User.find({
      email,
      accountVerified: false,
    });
    if (registrationAttemptsByUser.length >= 5) {
      return res.status(400).json({
        success: false,
        message:
          "You have exceeded registration attempts.Please contact support",
      });
    }
    if (password.length < 8 || password.length > 16) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 16 characters",
      });
    }
    const hasshedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hasshedPassword,
    });
    const verificationCode = await newUser.generateVerificatinCode();
    await newUser.save();
    sendVerificationCode(verificationCode, email, res);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to Register",
    });
  }
};

// export const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Email or OTP is missing",
//       });
//     }
//     const userAllEnteries = await User.find({
//       email,
//       accountVerified: false,
//     }).sort({ createdAt: -1 });
//     if (!userAllEnteries) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     let user;
//     if (userAllEnteries > 1) {
//       user = userAllEnteries[0];
//       await User.deleteMany({
//         _id: { $ne: user._id },
//         email,
//         accountVerified: false,
//       });
//     } else {
//       user = userAllEnteries[0];
//     }
//     if (user.verificationCode !== Number(otp)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }
//     const currentTime = Date.now();
//     const verificationCodeExpire = new Date(
//       user.verificationCodeExpires
//     ).getTime();

//     if (currentTime > verificationCodeExpire) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired",
//       });
//     }
//     user.accountVerified = true;
//     user.verificationCode = null;
//     user.verificationCodeExpires = null;
//     await user.save({ validateModifiedOnly: true });
//     sendToken(user, 200, "Account verified", res);
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({
//       success: false,
//       message: "Ivalid",
//     });
//   }
// };
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email or OTP is missing",
      });
    }

    const userAllEntries = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    // Fix: Check if userAllEntries is empty
    if (!userAllEntries || userAllEntries.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let user = userAllEntries[0]; // Safe to access because we've checked length

    if (userAllEntries.length > 1) {
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });
    }

    // Fix: Ensure user is defined before accessing properties
    if (!user || user.verificationCode !== Number(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const currentTime = Date.now();
    const verificationCodeExpire = new Date(
      user.verificationCodeExpires
    ).getTime();

    if (currentTime > verificationCodeExpire) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save({ validateModifiedOnly: true });

    sendToken(user, 200, "Account verified", res);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const user = await User.findOne({ email, accountVerified: true });
    console.log(user)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User don't exists",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email of password",
      });
    }
    sendToken(user, 200, "User login successfully", res);
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to Login",
    });
  }
};

export const Logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

export const GetUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};

export const ForgotPassword = async (req, res) => {
  try {
    const {email}=req.body;
    const user=await User.findOne({email,accountVerified:true});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Invalid email"
      })
    }
    const resetToken=user.getResetPasswordToken();
    await user.save({validationBeforSave:false});
    const ResetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message=generateForgotPasswordEmailTemplate(ResetPasswordUrl);

    await sendEmail({
      email:user.email,
      subject:"BookWorm Library Managment System Password Recovery",
      message
    })
    res.status(200).json({
      success:true,
      message:`Email send to ${user.email} successfully`
    })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to send email",
    });
  }
};

export const ResetPassword=async(req,res)=>{
  try{
    const{token}=req.params;
    console.log("Token",token)
    console.log("Request Body:", req.body);

    const resetPasswordToken=crypto.createHash("sha256").update(token).digest("hex");
    const user=await User.findOne({resetPasswordToken,resetPasswordExpires:{$gt:Date.now()}});
    console.log("Hashed Token:", resetPasswordToken);
    console.log("User Found:", user);
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Reset Password token is invalid or expired"
      })
    }
    if(req.body.password!==req.body.confirmPassword){
      return res.status(400).json({
        success:false,
        message:"Password & confrirm Password do not match"
      })
    }
    if(req.body.password.length<8 || req.body.password.length>16 || req.body.confirmPassword.length<8 ||req.body.confirmPassword.length>16){
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 16 characters",
      });
    }
    const hashPassword=await bcrypt.hash(req.body.password,10);
    user.password=hashPassword;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpires=undefined;

    await user.save();

    sendToken(user,200,"Password Reset send successfully",res)
  }
  catch(error){
    return res.status(400).json({
       success:false,
       message:"Failed Password Reset"
    })
  }
}

export const UpdatePassword=async(req,res)=>{
  try{
    const user=await User.findById(req.user._id);
    const{currentPassword,newPassword,confirmNewPassword}=req.body;
    if(!currentPassword || !newPassword||!confirmNewPassword){
      return res.status(400).json({
        success:false,
        message:"All fields required"
      })
    }
    const isPasswordMatch=await bcrypt.compare(currentPassword,user.password);
    if(!isPasswordMatch){
      return res.status(400).json({
        success:false,
        message:"Current Password is incorrect"
      })
    }
    if(newPassword.length<8 || newPassword.length>16 || confirmNewPassword.length<8 ||confirmNewPassword.length>16){
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 16 characters",
      });
    }
    if(newPassword!=confirmNewPassword){
      return res.status(400).json({
        success: false,
        message: "New password nad confirm new password do not match",
      });
    }
    const hashPassword=await bcrypt.hash(newPassword,10);
    user.password=hashPassword,
    await user.save();
    res.status(200).json({
      success:true,
      message:"Password updated"
    })
  }
  catch(error){
    return res.status(400).json({
      success:false,
      message:"Failed to update password"
   })
  }
}


