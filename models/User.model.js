import { DataTypes } from 'sequelize'
import {sequelize} from '../db/index.js'
import { userData } from '../data.js';

const User = sequelize.define("User", {
    id :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    student_id : {
        type : DataTypes.INTEGER,
        unique : true,
        allowNull : false
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    surname : {
        type : DataTypes.STRING,
        allowNull : false
    },
    college : {
        type : DataTypes.STRING,
        allowNull : false
    },
    course : {
        type : DataTypes.STRING,
        allowNull : false
    }
});

const uploadingDataInDatabase = async()=>{
    await User.bulkCreate(userData);
}

export {User, uploadingDataInDatabase}





