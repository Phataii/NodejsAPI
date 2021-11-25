
// Libraries installed for the rest api
require('dotenv/config')
const express = require("express");
const app = express();
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const helmet = require ("helmet");
const morgan = require ("morgan");
const connectDB = require("./config/db")

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config();


connectDB();

//mongoose.connect(
  //  process.env.MONGO_URL, {useNewUrlParser: true}, ()=>{
    //    console.log("Connected to MongoDB")
    //}
//)

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.get("/", (req, res)=>{
    res.send("Welcome to Home Page")
})

app.get("/user", (req, res)=>{
    res.send("Welcome to user Page")
})

const PORT = process.env.PORT || 4000;

app.listen(PORT,() =>{
    console.log(`Backend server is running on ${PORT}!`)
})