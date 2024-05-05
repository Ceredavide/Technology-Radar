const HttpError = require("../classes/HttpError")

module.exports  = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
        console.log(err);
        next(new HttpError("Something went wrong, try again later.", 500));
    });
};