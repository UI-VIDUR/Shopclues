const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

let db;

const connectDB = async () => {
    try {
        db = await mongoose.connect(MONGO_URL, clientOptions);
        console.log("Connected to MongoDB!");
    } catch(err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // Exit the application if unable to connect to MongoDB
    }
}

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    } catch(err) {
        console.error("Error disconnecting from MongoDB:", err.message);
    }
}

process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await disconnectDB();
    process.exit(0);
});

module.exports = { connectDB, disconnectDB, db };
