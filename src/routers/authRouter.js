const express = require("express");
const { register, login, token, forgotPassword } = require("../controllers/authController");
const authValidation = require("../middlewares/validations/authValidation");
const { checkToken } = require("../middlewares/authToken");


const router = express.Router();

router.post("/register", authValidation.register, register);
router.post("/login", authValidation.login, login);
router.get("/token", checkToken, token)
router.post("/forgot-password", forgotPassword)

module.exports = router;
