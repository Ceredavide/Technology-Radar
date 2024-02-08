const errorHandler = (error, req, res, next) => {

    if (res.headerSent) {
        return next(error)
    }
    
    res.status(error.code || 500)
    res.json(error.message || "An unkown error ocurred.")
}

module.exports = errorHandler