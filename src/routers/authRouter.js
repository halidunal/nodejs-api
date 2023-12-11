const express = require("express");
const { register, login, token, forgotPassword, resetCodeCheck, resetPassword } = require("../controllers/authController");
const authValidation = require("../middlewares/validations/authValidation");
const { checkToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/register", authValidation.register, register);
router.post("/login", authValidation.login, login);
router.get("/token", checkToken, token);
router.post("/forgot-password", forgotPassword);
router.post("/reset-code-check", resetCodeCheck);
router.post("/reset-password", resetPassword);

module.exports = router;
