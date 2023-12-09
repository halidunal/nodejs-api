const rateLimit = require("express-rate-limit");

const allowedList = ["::1"];

const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: (req,res) => {
       if(req.url === "/login" || req.url === "/register") return 5
       else return 100
    },
    message: {
        success: false,
        message: "Too many request"
    },
    skip: (req,res) => allowedList.includes(req.ip),
    standardHeaders: true,
    lagacyHeaders: false
})

module.exports = apiLimiter