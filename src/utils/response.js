class Response {
    constructor(data = null, message = null) {
        this.data = data
        this.message = message
    }

    success(res) {
        return res.status(200).json({
            success: true,
            data: this.data,
            message: this.message ?? "Transaction successful"
        })
    }

    create(res) {
        return res.status(201).json({
            success: true,
            data: this.data,
            message: this.message ?? "Transaction succefassful"
        })
    }

    error400(res) {
        return res.status(400).json({
            success: false,
            data: this.data,
            message: this.message ?? "Transaction failure. Bad request"
        })
    }

    error401(res) {
        return res.status(401).json({
            success: false,
            data: this.data,
            message: this.message ?? "Transaction failure. Unauthorized"
        })
    }

    error404(res) {
        return res.status(409).json({
            success: false,
            data: this.data,
            message: this.message ?? "Transaction failure. Not found"
        })
    }

    error429(res) {
        return res.status(429).json({
            success: false,
            data: this.data,
            message: this.message ?? "Transaction failure. Too many request"
        })
    }

    error500(res) {
        return res.status(500).json({
            success: false,
            data: this.data,
            message: this.message ?? "Transaction failure"
        })
    }
}

module.exports = Response