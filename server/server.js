import dotenv from "dotenv";
import { connectDb } from "./config/dbConnection.js";
import { app } from "./app.js";

dotenv.config();
connectDb();

const port = process.env.PORT || 6000;



app.listen(port, (error)=>{
    if(!error){
        console.log(`Server Started at ${port}`)

    } else {
        console.log("Error ocuured, server can't start", error);
    }
})