const AuthSchema = require("../models/authModel.js");
const jwt = require("jsonwebtoken");
const bcrypte = require("bcryptjs");
const APIError = require("../utils/errors.js");
const Response = require("../utils/response.js");
const { createToken, createTempToken, decodeTempToken } = require("../middlewares/authToken.js");
const crypto = require("crypto");
const sendEmail = require("../utils/mailSender.js");
const moment = require("moment")

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

const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await AuthSchema.findOne({email}).select("username email");

  if(!user) return new APIError("Invalid user",400);

  const resetCode = crypto.randomBytes(3).toString("hex");
  await sendEmail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Reset",
    text: `Your password reset code: ${resetCode}`
  })

  await AuthSchema.updateOne(
    {email},
    {
      reset: {
        code: resetCode,
        time: moment(new Date()).add(15, "minute").format("YYYY-MM-DD HH:mm:ss")
      }
    }
  )

  return new Response(true, "Please check your emails").success(res)
}

const resetCodeCheck = async (req,res) => {
  const {email, code} = req.body;
  const user = await AuthSchema.findOne({email}).select("_id username email reset")

  if(!user) throw new APIError("Invalid code", 401);

  const time = moment(user.reset.time)
  const now = moment(new Date());

  const timeDiff = time.diff(now, "minutes");

  if(timeDiff <= 0 || user.reset.code !== code) throw new APIError("Invalid code", 401);

  const tempToken = await createTempToken(user._id, user.email);

  return new Response({tempToken}, "Reset password active").success(res)
}

const resetPassword = async (req,res) => {
  const {password, tempToken} = req.body;

  const decodeToken = await decodeTempToken(tempToken);
  const hashPassword = await bcrypte.hash(password, 10);

  await AuthSchema.findByIdAndUpdate(
    {_id: decodeToken._id},
    {
      reset: {
        code: null,
        time: null
      },
      password: hashPassword
    }
  )
  return new Response(decodeToken, "Password reset successful").success(res)
}

module.exports = { register, login, token, forgotPassword, resetCodeCheck, resetPassword };
