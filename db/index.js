import { Sequelize } from "sequelize";

const sequelize = new Sequelize("PROJECT", "root", "darshil29072002", {
  host: "localhost",
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export {connectDB, sequelize}
