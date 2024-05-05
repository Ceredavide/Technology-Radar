const HttpError = require("../classes/HttpError")
const Technology = require("../models/Technology")
const addIncompleteTechnologies = require("../utils/addIncompleteTechnologies")
const formatErrors = require("../utils/formatErrors")
const formatTechnologies = require("../utils/formatTechnologies")
const asyncHandler = require("../utils/asyncHandler");

// Get specific technology by ID
exports.getTechnologyById = asyncHandler(async (req, res, next) => {
    const technology = await Technology.findById(req.params.id, '-published -creator -createdAt -updatedAt -__v');
    res.status(200).json(technology);
});

// Get all published technologies
exports.getPublishedTechnologies = asyncHandler(async (req, res, next) => {
    const technologies = await Technology.find({ published: true }, '-_id -published -creator -createdAt -updatedAt -__v');
    res.status(200).json(formatTechnologies(technologies));
});

// Get all technologies with populated fields and additional processing
exports.getAllTechnologies = asyncHandler(async (req, res, next) => {
    const technologies = await Technology.find({}).populate("creator publisher edits.user", "-_id -password -createdAt -updatedAt -role -__v");
    const formatted = formatTechnologies(technologies);
    res.status(200).json(addIncompleteTechnologies(technologies, formatted));
});

// Create new technology entry
exports.createTechnology = asyncHandler(async (req, res, next) => {
    const { name, description, category, ring, descriptionCategorization } = req.body;
    const technology = new Technology({ name, description, category, ring, descriptionCategorization, creator: req.userData._id });
    
    const errors = technology.validateSync();
    if (errors) {
        return next(new HttpError("Bad Request: " + formatErrors(Object.values(errors.errors)), 400));
    }

    await technology.save();
    res.status(201).json(technology.toObject());
});

// Publish a technology
exports.publishTechnology = asyncHandler(async (req, res, next) => {
    const technology = await Technology.findById(req.params.id, '-published -creator -createdAt -updatedAt -__v');
    if (!technology) {
        return next(new HttpError("Technology not found.", 404));
    }
    if (technology.published) {
        return next(new HttpError("Technology already published.", 400));
    }

    Object.assign(technology, {
        ring: req.body.ring,
        descriptionCategorization: req.body.descriptionCategorization,
        publisher: req.userData._id,
        publishedAt: new Date(),
        published: true
    });

    const errors = technology.validateSync();
    if (errors) {
        return next(new HttpError("Bad Request: " + formatErrors(Object.values(errors.errors)), 400));
    }

    await technology.save();
    res.status(200).json(technology.toObject());
});

// Edit existing technology
exports.editTechnology = asyncHandler(async (req, res, next) => {
    const technology = await Technology.findById(req.params.id, '-published -creator -createdAt -updatedAt -__v');
    if (!technology) {
        return next(new HttpError("Technology not found.", 404));
    }

    Object.assign(technology, req.body);
    technology.edits.push({ user: req.userData._id, time: new Date(), action: "technology" });

    const errors = technology.validateSync();
    if (errors) {
        return next(new HttpError("Bad Request: " + formatErrors(Object.values(errors.errors)), 400));
    }

    await technology.save();
    res.status(200).json(technology.toObject());
});

exports.editTechnologyRing = asyncHandler(async (req, res, next) => {
    const technology = await Technology.findById(req.params.id, '-published -creator -createdAt -updatedAt -__v');
    
    if (!technology) {
        return next(new HttpError("Technology not found.", 404));
    }

    technology.ring = req.body.ring;
    technology.edits.push({ user: req.userData._id, time: new Date(), action: "ring" });

    const errors = technology.validateSync();
    if (errors) {
        return next(new HttpError("Bad Request: " + formatErrors(Object.values(errors.errors)), 400));
    }

    await technology.save();
    res.status(200).json(technology.toObject());
});
