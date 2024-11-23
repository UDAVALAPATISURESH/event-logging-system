const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/eventLogs");
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1);
    }
};

module.exports = connectDB;
