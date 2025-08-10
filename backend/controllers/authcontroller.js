const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { sendverificationcode } = require("../middleware/emailContent");

const singup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({ status: false, message: "user already exist " });
    }
    const verificationcode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const istlemaalwala = new UserModel({
      name,
      password,
      email,
      verificationcode,
      isverified: false,
   
    });
    istlemaalwala.password = await bcrypt.hash(password, 10);
    await istlemaalwala.save();
    sendverificationcode(email, verificationcode);

    res.status(201).json({
      message: "otp send successfully",
      success: true,
    });
  } catch (err) {
    console.error("Signup Error:", err.message, err.stack);
    res.status(500).json({
      message: "internal server error hai bhai",
      success: false,
    });
  }
};

const otpverification = async (req, res) => {
  try {
    const { otp } = req.body; // ✅ Properly extract 'otp' from request

    const user = await UserModel.findOne({
      verificationcode: otp, // ✅ Compare with the string directly
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    user.isverified = true; // ✅ Fixed typo
    user.verificationcode = undefined;

    await user.save();

    res.json({ success: true, message: "OTP verified successfully" }); // ✅ Send final response
  }catch (err) {
    console.error("Signup Error:", err.message, err.stack);
    res.status(500).json({
      message: "internal server error hai bhai",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        status: false,
        message: "user not  exist , login first ",
      });
    }
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return res.json({ status: false, message: "wrong password" });
    }

    if (!user.isverified) {
      return res.json({
        status: false,
        message: "please verfy your email id first",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRTE || "defaultsecret",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "login successfull",
      token,
      name: user.name,
      success: true,
      pass: user.password,
    });
  } catch (err) {
    res.status(500).json({
      message: "internal server error ,dikkat h kuch",
      success: false,
    });
  }
};


const Home = async (req, res) => {
  try {
    const { email, tbhmsg } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.tbhmsg = tbhmsg;
    await user.save();
    res.status(201).json({
      message: "TBHMSG send successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
module.exports = { singup, login, otpverification ,Home};
