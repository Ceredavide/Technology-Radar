const mongoose = require("mongoose")

const Server = require("./classes/Server")

const startServer = () => {

    console.log("Starting Server....")
    let server = new Server().server;

    let dbUrl;
    let port

    if (process.env.NODE_ENV === 'development') {
       dbUrl = process.env.DB_URL
        port = 80
    }else{
        dbUrl = "mongodb://db:27017/tech-radar"
        port = 8000
    }

    console.log("Connecting to DB....")
    mongoose.connect(dbUrl).then(() => {
        console.log('Connected to DB successfully');
        httpServer = server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }).catch((err) => {
        console.error('Connection to DB failed: ' + err);
        console.error('Failed to launch the server!');
    })
}

startServer();