const HttpError = require("../classes/HttpError")
const Technology = require("../models/Technology")
const formatErrors = require("../utils/formatErrors")
const formatTechnologies = require("../utils/formatTechnologies")

//
//GET
//
exports.getPublished = async (req, res, next) => {

    let technologies

    try {
        technologies = await Technology.find({ published: true }, '-published -creator -createdAt -updatedAt -__v')
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    const formattedTechnologies = formatTechnologies(technologies)

    res.status(200).json(formattedTechnologies)
}

//
//POST
//
exports.create = async (req, res, next) => {

    const { _id: userId } = req.userData

    const {
        name,
        description,
        category,
        ring,
        descriptionCategorization
    } = req.body

    const technology = new Technology({
        name,
        description,
        category,
        ring,
        descriptionCategorization,
        creator: userId
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