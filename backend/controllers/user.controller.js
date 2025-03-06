// controllers/user.controller.js
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const hashPassword = require("../utils/hashPassword")
const crypto = require('crypto');
const bcrypt = require("bcrypt")

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobile, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({ name, email, password, mobile, role });
  if (user) {
    res.status(201).json({ _id: user._id, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, role: user.role, token: generateToken(user._id) });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const userDetaile = asyncHandler(async (req, res) => {
  // const { email, password } = req.body;
  const ID = req.params.id
  const user = await User.findOne({ _id:ID });
  if (user) {
    res.json({user});
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a JWT token for password reset
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password Link",
      text: `Click on this link to reset your password: ${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send reset password email" });
      } else {
        return res.status(200).json({ message: "Reset password link sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token belongs to the user
    if (decoded.id !== id) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { registerUser, loginUser,userDetaile, forgotPassword, resetPassword };


// const asyncHandler = require("express-async-handler");
// const User = require("../models/user.model");
// const generateToken = require("../utils/generateToken");
// const sendEmail = require("../utils/emailService");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// // Register a new user
// exports.registerUser = asyncHandler(async (req, res, next) => {
//   const { name, email, password, mobile, role } = req.body;
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }
//   const user = await User.create({ name, email, password, mobile, role });
//   if (user) {
//     res.status(201).json({ _id: user._id, token: generateToken(user._id) });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

// // Login user
// exports.loginUser = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user && (await user.matchPassword(password))) {
//     res.json({ _id: user._id, role: user.role, token: generateToken(user._id) });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// // Forgot password
// exports.forgotPassword = async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;
//     await sendEmail(
//       email,
//       "Reset Password Link",
//       `Click on this link to reset your password: ${resetLink}`
//     );

//     res.status(200).json({ message: "Reset password link sent successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// // Reset password
// exports.resetPassword = async (req, res, next) => {
//   const { id, token } = req.params;
//   const { password } = req.body;
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.id !== id) return res.status(400).json({ message: "Invalid token" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.findByIdAndUpdate(id, { password: hashedPassword });

//     res.status(200).json({ message: "Password reset successfully" });
//   } catch (error) {
//     next(error);
//   }
// };