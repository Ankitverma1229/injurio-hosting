import express from 'express';
import dotenv from 'dotenv'
import router from './routes/router.js';
import { errorHandle } from './middleware/errorHandler.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

export const app = express(); 

let parenDir = path.resolve(process.cwd(), ".");
app.use('/public', express.static(path.join(parenDir, "public")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.options("*", cors());


app.use("/injurio", router);
app.use(errorHandle);