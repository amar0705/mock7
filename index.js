const express = require("express")
const {connection} = require("./configs/db")
const {userRouter} = require("./routes/user.route")
const {authenticate} = require("./middlewares/authenticate.middleware")
const {restaurantRouter} = require("./routes/restaurant.route")
const {orderRouter} = require("./routes/order.route")

require("dotenv").config()
const app = express()
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Homepage")
})

app.use("/api", userRouter)
app.use(authenticate)
app.use("/api", restaurantRouter)
app.use("/api", orderRouter)

app.listen(process.env.port, async(req,res)=>{
    try{
        await connection
        console.log("Connected to DB")
    }
    catch(err){
        console.log(err)
    }
    console.log(`Listening to port ${process.env.port}`)
})