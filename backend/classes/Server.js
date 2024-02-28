const express = require("express")
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require("body-parser")
const morgan = require("morgan");

const HttpError = require("./HttpError");
const errorHandler = require("../controllers/error");
const setEnvVariables = require("../utils/setEnvVariables");

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

        if (process.env.NODE_ENV === 'development') {
            this.server.use(morgan('[:date[iso]] method::method url::url status::status res.time::response-time ms'));
            this.server.use(cors({ origin: 'http://localhost:4200' }));
        }

        setEnvVariables()


        this.server.use(bodyParser.json({ limit: '5mb' }));

        this.server.use(helmet())

        this.server.use("/api", require('../routes'))

        this.server.use((req, res, next) => {
            throw new HttpError("Not Found.", 404)
        })

        this.server.use(errorHandler)
    }
}

module.exports = Server;