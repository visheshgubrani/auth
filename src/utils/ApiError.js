class ApiError extends Error {
    constructor(statusCode, message='Something went Wrong', errors=[]) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.errors = errors
        this.message = message
    }
}

export {ApiError}