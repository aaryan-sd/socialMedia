import dotenv from "dotenv"

import connectDB from './db/index.js';
import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import {app} from "./app.js";

dotenv.config({
  path: './.env'
})

const PORT = process.env.PORT || 8000

// connectDB function called, which is written in db/index.js (for mongodb connection)
connectDB()
.then(() => {
  app.listen( PORT, () => {
    console.log("Server is running at PORT 8000");
  })
})
.catch((err) => {
  console.log("MongoDB connection failed", err);
})

