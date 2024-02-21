const HttpError = require("../classes/HttpError")

module.exports = roles => {

    return (req, res, next) => {

        const { userData: user } = req

        if (roles.findIndex(role => role === user.role) === -1) {
            console.warn("Someone tried to access unauthorized content with USER_ID:" + user._id)
            return next(new HttpError("The user hat not access to this resource.", 403))
        }

        next()
    }
}