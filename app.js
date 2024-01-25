require("dotenv").config()
const { urlencoded } = require("body-parser");
const express = require("express")
const app = express();
const connectDB = require("./db/connect")
const router = require("./routes/index");
const start = async()=>{
    try {
        await connectDB();
        console.log("DB Connected");
    } catch (error) {
        console.log(error)
    }
}
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('api/v1/tasks',router)
app.listen(5000)
start()