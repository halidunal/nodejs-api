const router = require("express").Router()

const auth = require("./authRouter")

router.use(auth);

module.exports = router