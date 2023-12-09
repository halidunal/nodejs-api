const router = require("express").Router();
const upload = require("../middlewares/lib/upload");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const auth = require("./authRouter");
const multer = require("multer")

router.use(auth);

router.post("/upload", (req, res) => {
    upload(req,res, (error) => {
        if(error instanceof multer.MulterError) throw new APIError("An error occurred while loading the image duo to multer", error)
        else if (error) throw new APIError("An error occurred while loading the image", error)
        else return new Response(req.savedImages, "Upload successfuly").success(res)
    })
})

module.exports = router