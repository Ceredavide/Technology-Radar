const dotenv = require('dotenv');
const path = require('path');

module.exports = () => {
    let fileName;

    if (process.env.NODE_ENV === "production") {
        fileName = "production.env"
    } else {
        fileName = "development.env"
    }

    dotenv.config({
        path: path.resolve("./", fileName)
    });
}

