const express = require("express")
const helmet = require("helmet");
const bodyParser = require("body-parser")
const morgan = require("morgan");

const HttpError = require("./HttpError");
const errorHandler = require("../controllers/error");

class Server {

    server;

    constructor() {
        this.server = express();
        this.setUp()
    }

    setUp = () => {
        if (process.env.NODE_ENV !== 'test') {
            this.server.use(morgan('[:date[iso]] method::method url::url status::status res.time::response-time ms'));
        }

        this.server.use(bodyParser.json({ limit: '5mb' }));

        this.server.use(helmet())

        this.server.use(require('../routes'))

        this.server.use((req, res, next) => {
            throw new HttpError("Not Found.", 404)
        })

        this.server.use(errorHandler)
    }
}

module.exports = Server;