require("express-async-errors");
const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db");
const bodyParser = require("body-parser");
const router = require("./src/routers");
const app = express();
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");
const errorHandleMiddleware = require("./src/middlewares/errorHandler");
const mongoSanitinize = require("express-mongo-sanitize");
const path = require("path");
const apiLimiter = require("./src/middlewares/rateLimit")

dotenv.config();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome"
    })
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname));

app.use(cors(corsOptions));

app.use("/api", apiLimiter)

app.use(
    mongoSanitinize({
        replaceWith: "_",
    })
);
app.use("/api", router);
db();

app.use(errorHandleMiddleware);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log("server is running port: ", port);
});
