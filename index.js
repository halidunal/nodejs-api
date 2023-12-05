const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db")

dotenv.config();

const app = express();

const port = process.env.PORT || 5001

app.get("/", (req, res) => {
    res.json({
        message: "Welcome"
    })
})

app.listen(port, () => {
    console.log("server is running port: ", port);
})

db();