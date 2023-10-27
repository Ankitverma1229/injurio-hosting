import asyncHandler from "express-async-handler";
import userData from "../models/registerModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const SECRET_KEY = "NOTESAPI";

export const UserDetails = asyncHandler(async(request, response)=>{
    const {email, password} = request.body;
    const registerdUser = await userData.findOne({email: email});

    if(!registerdUser){
        response.status(404);
        throw new Error("No account found with this id");
    }

    const matchPassword = await bcrypt.compare(password, registerdUser.password);
    if(!matchPassword){
        response.status(400);
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({
        name: registerdUser.name,
        email: registerdUser.email,
        password: password,
        id: registerdUser._id
    },
    SECRET_KEY
    );

    response.status(201).json({
        message: "Login Successful",
        userDetails: registerdUser,
        token
    });
});