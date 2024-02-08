const HttpError = require("../classes/HttpError")
const Technology = require("../models/Technology")
const formatErrors = require("../utils/formatErrors")

//
//POST
//
exports.create = async (req, res, next) => {

    const {
        name,
        category,
        ring,
        description
    } = req.body

    const technology = new Technology({
        name,
        category,
        ring,
        description
    })

    let errors = technology.validateSync()

    if (errors) {
        errorsString = formatErrors(Object.values(errors.errors))
        return next(new HttpError("Bad Request:" + errorsString, 400))
    }

    try {
        await technology.save();
    } catch (err) {
        return next(new HttpError("Internal Server Error, please try again later.", 500))
    }

    res.status(201).json(technology.toObject())
}