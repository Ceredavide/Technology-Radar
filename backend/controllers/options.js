const CATEGORIES = require('../constants/CATEGORIES');
const RINGS = require('../constants/RINGS');

const sendFormattedData = (data, res) => {
    const formattedData = Object.entries(data);
    res.status(200).json(formattedData);
};

exports.getCategories = (req, res, next) => {
    sendFormattedData(CATEGORIES, res);
};

exports.getRings = (req, res, next) => {
    sendFormattedData(RINGS, res);
};
