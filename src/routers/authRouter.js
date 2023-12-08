const express = require("express");
const { register, login, token } = require("../controllers/authController");
const authValidation = require("../middlewares/validations/authValidation");
const { checkToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/register", authValidation.register, register);
router.post("/login", authValidation.login, login);
router.get("/token", checkToken, token)

module.exports = router;
