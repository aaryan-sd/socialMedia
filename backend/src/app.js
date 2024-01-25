import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
    origin: 'https://aaryan-sd-connectify.netlify.app',
    credentials: true,
  };
  
  app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


// routes import 
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'

//routes declaration
app.use("/api/v1/users", userRouter)  // at route- /api/v1/users, control is given to userRouter

app.use("/api/v1/posts", postRouter)

export { app }
