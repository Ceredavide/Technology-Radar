const CATEGORIES = require('../constants/CATEGORIES')
const RINGS = require('../constants/RINGS')

//
//GET
//
exports.getCategories = async (req, res, next) => {
    res.status(200).json(CATEGORIES)
}

exports.getRings = async (req, res, next) => {
    res.status(200).json(RINGS)
}