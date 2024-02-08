const dotenv = require('dotenv');
const path = require('path');
const mongoose = require("mongoose")

const Server = require("./classes/Server")

let fileName;

if(process.env.NODE_ENV === "production"){
    fileName = "production.env"
}else{
    fileName = "development.env"
}

dotenv.config({
    path: path.resolve(__dirname, fileName)
});

const startServer = async () => {

    let server = new Server().server;

    try {
        mongoose.connect(process.env.DB_URL);
        console.log('Connected to the DB successfully');
        httpServer = server.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Connection to the DB failed: ' + err);
        console.error('Failed to launch the server!');
    }
};

startServer();