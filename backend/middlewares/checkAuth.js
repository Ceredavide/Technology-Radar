const jwt = require("jsonwebtoken")

const HttpError = require("../classes/HttpError")
const User = require("../models/User")

module.exports = async (req, res, next) => {

    let decodedToken;

    let user;

    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            throw new Error("Token not valid.")
        }

        decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    } catch (err) {
        console.log(err)
        return next(new HttpError("Unauthorized", 401))
    }

    try {
        user = await User.findById(decodedToken.id)
    } catch (err) {
        return next(new HttpError("Token not valid."))
    }

    if (!user) {
        return next(new HttpError("Token not valid."))
    }

    console.log("Utente connesso: " + user.id)

    req.userData = user;

    return next()
}