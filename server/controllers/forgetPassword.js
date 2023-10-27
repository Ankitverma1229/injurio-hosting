import UserData from "../models/registerModel.js";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const keysecret = process.env.SECRET_KEY;

const transportor = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const forgotPassword = asyncHandler(async (request, response) => {
  const { email } = request.body;
  const existingUser = await UserData.findOne({ email: email });
  if (!existingUser) {
    response.status(404);
    throw new Error("user not found");
  }

  const token = jwt.sign({ _id: existingUser._id }, keysecret, {
    expiresIn: "120s",
  });
  try {
    const setUserToken = await UserData.findByIdAndUpdate(
      { _id: existingUser._id },
      { verifyToken: token },
      { new: true }
    );
    if (setUserToken) {
      let mailOptions = {};
      if (existingUser) {
        mailOptions = {
          from: process.env.SMTP_MAIL,
          to: email,
          subject: "Sending email for password reset",
          text: `This link is valid for 2 MINUTES http://localhost:3000/create-new-password/${existingUser._id}/${setUserToken.verifyToken} `,
        };
      }

      transportor.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          response.status(401);
          throw new Error("Email not send");
        } else {
          console.log("Email sent", info.response);
          response.status(201).json({ message: "Email sent Successfully!!" });
        }
      });
    }
    console.log("User updated:", setUserToken);
  } catch (error) {
    console.error("Database update error:", error);
  }

  response.json({ message: "Email sent Successfully" });
});

export const resetPassword = asyncHandler(async (request, response) => {
  const { id, token } = request.params;

  try {
    const validUser = await UserData.findOne({
      _id: id,
      verifyToken: token,
    });
    const verifyToken = jwt.verify(token, keysecret);

    if (!validUser) {
      response.status(404);
      throw new Error("User not found");
    }
    if (validUser && verifyToken._id) {
      response.status(201).json(validUser);
    }
  } catch (error) {
    response.status(401);
    throw new Error(error);
  }
});

export const updatePassword = asyncHandler(async (request, response) => {
  const { id, token } = request.params;
  const { password } = request.body;

  try {
    const validUser = await UserData.findOne({
      _id: id,
      verifyToken: token,
    });
    if (!validUser) {
      response.status(404);
      throw new Error("User not found");
    }

    const verifyToken = jwt.verify(token, keysecret);

    if (validUser && verifyToken._id) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserData.findByIdAndUpdate(
        { _id: id },
        { password: hashedPassword }
      );

      response.status(201).json({ message: "Password updated successfully" });
    } else {
      response.status(401);
      throw new Error("User not authorized");
    }
  } catch (error) {
    console.log(error);
    response.status(500);
    throw new Error("Internal server error");
  }
});
