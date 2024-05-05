const jwt = require("jsonwebtoken");
const HttpError = require("../classes/HttpError");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(new HttpError("Authorization header not provided.", 401));
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(new HttpError("Token not provided.", 401));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return next(new HttpError("User not found with this token.", 401));
        }
        req.userData = user;
        next();
    } catch (err) {
        console.error(err);
        next(new HttpError("Unauthorized", 401));
    }
};
