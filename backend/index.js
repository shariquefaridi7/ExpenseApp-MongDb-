import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import { sequelize } from './util/dbconfig.js';
import { userData } from './models/userModel.js';
import { expensis } from './models/expensisModel.js';
import expensisRoute from './routes/expensisRoute.js';
import leaderBoardRoute from './routes/leaderboradRoute.js';
import premiumRouter from './routes/premiumRoute.js';
import {dotenv} from 'dotenv'
const app=express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


// routes  

app.use("/user",userRouter);
app.use("/expense",expensisRoute);
app.use("/leaderboard",leaderBoardRoute);
app.use("/premium",premiumRouter);

//relation between user and expenses table

userData.hasMany(expensis,{foreignKey:"userId"});
expensis.belongsTo(userData,{foreignKey:"userId"});


// connect backend to db 
sequelize.sync().then(()=>console.log("db connect")).catch((err)=>console.log(err));
app.listen(process.env.PORT||4000,()=>{
    console.log("Server start at 4000");
})
