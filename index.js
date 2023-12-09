require("express-async-errors");
const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db");
const bodyParser = require("body-parser");
const router = require("./src/routers");
const app = express();
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions")
const errorHandleMiddleware = require("./src/middlewares/errorHandler");
const mongoSanitinize = require("express-mongo-sanitize");

dotenv.config();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome"
    })
})

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors(corsOptions))

app.use(
    mongoSanitinize({
        replaceWith: "_",
    })
)
app.use("/api", router);
db();

app.use(errorHandleMiddleware);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log("server is running port: ", port);
})
