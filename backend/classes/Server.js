const express = require("express");
const helmet = require("helmet");
const cors = require('cors');
const morgan = require("morgan");

const HttpError = require("./HttpError");
const errorHandler = require("../controllers/error");
const setEnvVariables = require("../utils/setEnvVariables");

class Server {
    constructor() {
        if (typeof Server.instance === 'object') {
            return Server.instance;
        }

        this.express = express();
        this.setUp();
        Server.instance = this;
    }

    setUp = () => {
        if (process.env.NODE_ENV !== 'test') {
            this.express.use(morgan('[:date[iso]] method::method url::url status::status res.time::response-time ms'));
        }

        if (process.env.NODE_ENV === 'development') {
            this.express.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:4200' }));
        }

        setEnvVariables();

        this.express.use(express.json({ limit: '5mb' }));

        this.express.use(helmet());

        this.express.use("/api", require('../routes'));

        this.express.use((req, res, next) => {
            throw new HttpError("Not Found.", 404);
        });

        this.express.use(errorHandler);
    }
}

const getInstance = () => {
    if (!Server.instance) {
        Server.instance = new Server();
    }
    return Server.instance;
}

module.exports = getInstance;
