const mongoose = require("mongoose")

const Server = require("./classes/Server")

const startServer = () => {

    let server = new Server().server;

    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('Connected to the DB successfully');
        httpServer = server.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    }).catch((err) => {
        console.error('Connection to the DB failed: ' + err);
        console.error('Failed to launch the server!');
    })
}

startServer();