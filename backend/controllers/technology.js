const HttpError = require("../classes/HttpError")
const Technology = require("../models/Technology")

const addIncompleteTechnologies = require("../utils/addIncompleteTechnologies")
const formatErrors = require("../utils/formatErrors")
const formatTechnologies = require("../utils/formatTechnologies")

//
//GET
//
exports.getTechnologyById = async (req, res, next) => {

    const technologyId = req.params.id

    let technology

    try {
        technology = await Technology.findById(technologyId, ' -published -creator -createdAt -updatedAt -__v')
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    res.status(200).json(technology)
}

exports.getPublishedTechnologies = async (req, res, next) => {

    let technologies

    try {
        technologies = await Technology.find({ published: true }, '-_id -published -creator -createdAt -updatedAt -__v')
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    const formattedTechnologies = formatTechnologies(technologies)

    res.status(200).json(formattedTechnologies)
}

exports.getAllTechnologies = async (req, res, next) => {

    let technologies

    try {
        technologies = await Technology.find({}).populate("creator publisher edits.user","-_id -password -createdAt -updatedAt -role -__v")
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    const formattedTechnologies = formatTechnologies(technologies)

    const formattedTechnologiesWithIncompleteFields = addIncompleteTechnologies(technologies, formattedTechnologies)

    res.status(200).json(formattedTechnologiesWithIncompleteFields)
}

//
//POST
//
exports.createTechnology = async (req, res, next) => {

    const { _id: userId } = req.userData

    const {
        name,
        description,
        category,
        ring,
        descriptionCategorization
    } = req.body

    console.log(req.body)

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

//
//  PUT
//
exports.publishTechnology = async (req, res, next) => {

    const { _id: userId } = req.userData

    const technologyId = req.params.id

    const {
        ring,
        descriptionCategorization
    } = req.body

    let technology

    try {
        technology = await Technology.findById(technologyId, ' -published -creator -createdAt -updatedAt -__v')
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    if (!technology) {
        return next(new HttpError("Technology not found.", 404))
    }

    if (technology.published) {
        return next(new HttpError("Technology already published.", 400))
    }

    technology.ring = ring;
    technology.descriptionCategorization = descriptionCategorization;
    technology.publisher = userId;
    technology.publishedAt = new Date()
    technology.published = true
    
    const errors = technology.validateSync()

    if (errors) {
        errorsString = formatErrors(Object.values(errors.errors))
        console.log(errorsString)
        return next(new HttpError("Bad Request:" + errorsString, 400))
    }else{
        try {
            await technology.save();
        } catch (err) {
            return next(new HttpError("Internal Server Error, please try again later.", 500))
        }
    }

    res.status(200).json(technology.toObject())
}

exports.editTechnologyRing =async (req, res, next) => {

    const { _id: userId } = req.userData

    const technologyId = req.params.id

    const {
        ring,
        descriptionCategorization
    } = req.body

    let technology

    try {
        technology = await Technology.findById(technologyId, ' -published -creator -createdAt -updatedAt -__v')
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    if (!technology) {
        return next(new HttpError("Technology not found.", 404))
    }

    technology.ring = ring;
    technology.descriptionCategorization = descriptionCategorization;
    technology.edits.push({
        user: userId,
        time: new Date()
    })
    
    const errors = technology.validateSync()

    if (errors) {
        errorsString = formatErrors(Object.values(errors.errors))
        console.log(errorsString)
        return next(new HttpError("Bad Request:" + errorsString, 400))
    }else{
        try {
            await technology.save();
        } catch (err) {
            return next(new HttpError("Internal Server Error, please try again later.", 500))
        }
    }

    res.status(200).json(technology.toObject())
}

exports.editTechnology =async (req, res, next) => {

    const { _id: userId } = req.userData

    const technologyId = req.params.id

    const {
        name,
        description,
        category,
    } = req.body

    let technology

    try {
        technology = await Technology.findById(technologyId, ' -published -creator -createdAt -updatedAt -__v')
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    if (!technology) {
        return next(new HttpError("Technology not found.", 404))
    }

    technology.name = name;
    technology.description = description;
    technology.category = category
    technology.edits.push({
        user: userId,
        time: new Date()
    })
    
    const errors = technology.validateSync()

    if (errors) {
        errorsString = formatErrors(Object.values(errors.errors))
        console.log(errorsString)
        return next(new HttpError("Bad Request:" + errorsString, 400))
    }else{
        try {
            await technology.save();
        } catch (err) {
            return next(new HttpError("Internal Server Error, please try again later.", 500))
        }
    }

    res.status(200).json(technology.toObject())
}