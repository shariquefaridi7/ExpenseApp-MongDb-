import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import { sequelize } from './util/dbconfig.js';
import { userData } from './models/userModel.js';
import { expensis } from './models/expensisModel.js';
import expensisRoute from './routes/expensisRoute.js';

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


// middlewares 

app.use("/user",userRouter);
app.use("/expense",expensisRoute)

//relation between user and expenses table

userData.hasMany(expensis,{foreignKey:"userId"});
expensis.belongsTo(userData,{foreignKey:"userId"});


// connect backend to db 
sequelize.sync({force:false}).then(()=>console.log("db connect")).catch((err)=>console.log(err));
app.listen(4000,()=>{
    console.log("Server start at 4000");
})
