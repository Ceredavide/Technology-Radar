const mongoose = require("mongoose");
const Server = require("./classes/Server");

const connectToDb = async (dbUrl) => {
    console.log("Connecting to DB....");
    try {
        await mongoose.connect(dbUrl);
        console.log('Connected to DB successfully');
    } catch (err) {
        console.error('Connection to DB failed: ' + err);
        process.exit(1);
    }
}

const startServer = (server, port) => {
    console.log("Starting Server....");
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

const run = async () => {
    const server = new Server().server;
    const dbUrl = process.env.DB_URL || "mongodb://db:27017/tech-radar";
    const port = process.env.PORT || 8000;

    await connectToDb(dbUrl);
    startServer(server, port);
}

run();