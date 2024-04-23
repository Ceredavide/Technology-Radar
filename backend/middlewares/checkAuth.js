const jwt = require("jsonwebtoken")

const HttpError = require("../classes/HttpError")
const User = require("../models/User")

module.exports = async (req, res, next) => {

    let decodedToken;

    let user;

    try {

        if (!req.headers.authorization) {
            throw new Error("Authorization header not provided.")
        }

        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            throw new Error("Token not valid.")
        }

        decodedToken = jwt.verify(token, process.env.JWT_SECRET)


        user = await User.findById(decodedToken.id)


        if (!user) {
            throw new Error("User not found with this token.")
        }

    } catch (err) {
        return next(new HttpError("Unauthorized", 401))
    }

    req.userData = user;

    return next()
}