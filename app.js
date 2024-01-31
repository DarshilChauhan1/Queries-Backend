import Express from "express";
import { Op } from "sequelize";
import { connectDB, sequelize } from "./db/index.js";
import { syncDatabase } from "./db/syncDatabase.js";
import { User, uploadingDataInDatabase } from "./models/User.model.js";

const app = Express();

app.get("/posts", (req, res) => {
    
});

connectDB()
.then(()=>{
    console.log('Database connected successfully')
})
.catch((err)=>{
    console.log("Error in connecting database", err)
})

syncDatabase()
.then(()=>{
    console.log("Database is synced")
    // uploadingDataInDatabase();
})
.catch((err)=>{
    console.log("Error in sync", err)
})

app.post("/users",  async(req, res,next) => { /**next  */
    
    //Getting all the data and values from the body
    
    let {page, limit, search, orderBy, sortBy}= req.query
    if(!page) {
        page = 1;
    }
    if(!limit){
        limit = 10;
    }
    const offset = (page-1)*limit;

    //Implementing the queries functionalities

    if(search){
        //finding users through queries passed
        try {
            const userdetails = await User.findAndCountAll(
                {
                    // Working of the search query
                    where : {
                        [Op.or] : [
                            {
                                name : {
                                    [Op.like] : `${search}%`
                                }
                            },
                            {
                                course : {
                                    [Op.like] : `%${search}%`
                                }
                            }
                        ]
                    },
                    //Working of the order query how the users should be order by

                    order : [
                       [orderBy ? orderBy : "name", sortBy ? sortBy : 'ASC']
                    ],

                    //Pagination query how much data should be displayed

                    limit : parseInt(limit),
                    offset : parseInt(offset)
                }
            )

            //Returning the data to the frontend

            return res.json({
               data : userdetails.rows,
               currentpage : parseInt(page),
               totalpages : userdetails.count/limit     
            })
        } catch (error) {
            return res.status(404).json({message : "User not found"})
        }
        
    } else {
        return res.status(503).json({message : "Internal server error"});
    }
    
})

app.use((error,req,res,next)=>{
    res.status(error.code||503).send("Somthing went work")
})

app.listen(4000, (req, res) => {
  console.log("Server is listening");
});
