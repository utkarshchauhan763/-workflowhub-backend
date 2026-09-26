const mongoose = require("mongoose");
const config = require("./env");

const connectDatabase = async() => {
    try{
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connected Successfully");
    }
    catch(error){
        console.log("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;