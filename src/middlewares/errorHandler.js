const APIError = require("../utils/errors")

const errorHandleMiddleware = (err, req, res, next) => {
    if(err instanceof APIError) {
        return res.status(err.statusCode || 400)
        .json({
            success: false,
            message: err.message
        }) 
    }
    return res.status(500)
    .json({
        success: false,
        message: "Something went wrong. Please check your API"
    })
}

module.exports = errorHandleMiddleware