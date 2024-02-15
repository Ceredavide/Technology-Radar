const CATEGORIES = require('../constants/CATEGORIES')
const RINGS = require('../constants/RINGS')

//
//GET
//
exports.getCategories = async (req, res, next) => {
    categories = Object.entries(CATEGORIES)
    res.status(200).json(categories)
}

exports.getRings = async (req, res, next) => {
    rings = Object.entries(RINGS)
    res.status(200).json(rings)
}