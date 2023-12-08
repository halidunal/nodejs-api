const jwt = require("jsonwebtoken");
const APIError = require("../utils/errors");
const AuthSchema = require("../models/authModel")

const createToken = async (user, res) => {
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: "7D" });

    return res.status(201).json({
        success: true,
        data: user,
        token: token,
        message: "Login successful"
    })
} 

const checkToken = async (req,res,next) => {
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");

    if(!headerToken) throw new APIError("Unauthorized please log in",401);

    const token = req.headers.authorization.split(" ")[1]

    await jwt.verify(token, process.env.SECRET_KEY, async(error, decode) => {
        if(error) throw new APIError("Invalid token");
        const user = await AuthSchema.findById(decode.id).select("_id username email");

        if(!user) throw new APIError("Invalid token, user not found", 401);

        req.user = user;

        next();
    })
}

module.exports = { createToken, checkToken }