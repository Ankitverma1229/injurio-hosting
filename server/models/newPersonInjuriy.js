import mongoose from "mongoose";

const injuriyDetailSchema = new mongoose.Schema({
    name:{
       type:String,
    required:  [true, "Please enter injuried person name"]
    },
    description: {
        type:String,
        required: [true, "Please enter injuriy descritpion"]
    },
    bodyParts: [{
        type:String,
        required: [true, "Select body parts got injuried"]
    }],
    date: {
        type: String,
        required : [true, "Enter the date of inuriy"]
    },
    time: {
        type: String,
        required: [true, "Select the time of injuriy"]
    }

},
{
    timestamps: true,
});

export default mongoose.model ("InjuriyDetail", injuriyDetailSchema)