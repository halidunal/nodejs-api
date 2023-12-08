const AuthSchema = require("../models/authModel.js");
const jwt = require("jsonwebtoken");
const bcrypte = require("bcryptjs");
const APIError = require("../utils/errors.js");
const Response = require("../utils/response.js");
const { createToken } = require("../middlewares/authToken.js");

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const user = await AuthSchema.findOne({ email });
  if (user) {
    throw new APIError("This user already exist",401)
  }
  const passwordHash = await bcrypte.hash(password, 12);

  const newUser = await AuthSchema.create({
    username,
    email,
    password: passwordHash,
  }).then((data) => {
    // let token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY.toString(), {
    //   expiresIn: "1h",
    // });
    return new Response(data, "Saved successfully").create(res)
  }).catch((err) => {
    throw new APIError("Saved failure",400)
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthSchema.findOne({ email });

    if (!user) throw new APIError("No user found with matching email",401)  

    const passwordCompare = await bcrypte.compare(password, user.password);

    if (!passwordCompare) throw new APIError("The password is incorrect",401)

    createToken(user, res)

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const token = async (req, res) => {
  return new Response(req.user).success(res)
}

module.exports = { register, login, token };
