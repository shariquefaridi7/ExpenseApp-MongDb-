import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import expensisRoute from './routes/expensisRoute.js';
import leaderBoardRoute from './routes/leaderboradRoute.js';
import premiumRouter from './routes/premiumRoute.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// routes  

app.use("/user", userRouter);
app.use("/expense", expensisRoute);
app.use("/leaderboard", leaderBoardRoute);
app.use("/premium", premiumRouter);

//relation between user and expenses table




// connect backend to db 
const url = process.env.URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(process.env.PORT || 4000, () => {
    console.log("Server start at 4000");
})).catch((err) => console.log(err));

