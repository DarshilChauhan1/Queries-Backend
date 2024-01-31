import { sequelize } from "./index.js";


const syncDatabase = async()=>{
    try {
        await sequelize.sync()
        console.log("Database is synced correctly")
    } catch (error) {
        console.log("Error in syncing Database", error)
    }
}

export{syncDatabase}