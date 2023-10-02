import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

export const sequelize=new Sequelize(process.env.DB,"root",process.env.DBPASSWORD,{
    host:"localhost",
    dialect:"mysql"
})