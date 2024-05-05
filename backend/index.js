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

const startServer = (app, port) => {
    console.log("Starting Server....");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

const run = async () => {
    const dbUrl = process.env.DB_URL || "mongodb://db:27017/tech-radar";
    const port = process.env.PORT || 8000;

    await connectToDb(dbUrl);

    const app = Server().express;

    startServer(app, port);
}

run();