import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter Your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter Your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter Your password"],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please enter your confirm password"]
    },
    verifyToken: {
        type: String,
    },
},
{
    timestamps: true,
});

export default mongoose.model("UserData", userDetailSchema)