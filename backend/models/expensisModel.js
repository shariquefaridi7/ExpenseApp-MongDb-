import { Sequelize } from "sequelize";
import { sequelize } from "../util/dbconfig.js";

export const expensis=sequelize.define("expensisList",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    date:{
        type:Sequelize.STRING,
        allowNull:false
    },
    month:{
        type:Sequelize.STRING,
        allowNull:false
    }
})