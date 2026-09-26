const dotenv = require("dotenv");
dotenv.config();
const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.MODE_ENV || "development"
};

module.exports = config;
