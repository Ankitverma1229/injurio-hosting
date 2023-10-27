import asyncHanlder from "express-async-handler";
import userData from "../models/registerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "NOTESAPI";


export const registerUser = asyncHanlder(async(request, response)=>{
    const {name, email, password, confirmPassword} = request.body;
    if(!name || !email || !password || !confirmPassword){
        response.status(404);
        throw new Error("All fields are mandatory!!");
    } else if (password !== confirmPassword) {
        response.status(404);
        throw new Error("All fields are mandatory");
    }
    const existingUser = await userData.findOne({email});

    if(existingUser){
        response.status(404);
        throw new Error("User is Already Registered!!");
    }

    let newPassword = password.toString();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const userDetails = await userData.create({
        name,
        email,
        password: hashedPassword,
        confirmPassword
    });

    const token = jwt.sign({name: userDetails.name, email:userDetails.email, id:userDetails._id}, SECRET_KEY);



    if(userDetails) {
        response.status(200).json({_id:userDetails.id, email: userDetails.email, token: token, message: "Resgistered Successfylly!!"})
    }
    else {
        response.status(400);
        throw new Error("User data is not valid");
    }
})