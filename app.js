require("dotenv").config()
const { urlencoded } = require("body-parser");
const express = require("express")
const app = express();
const connectDB = require("./db/connect")
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const start = async()=>{
    try {
        await connectDB();
        console.log("DB Connected");
    } catch (error) {
        console.log(error)
    }
}

start()