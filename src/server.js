const app = require("./app");
const config = require("./config/env");
const connectDatabase = require("./config/database");


const startServer = async() => {
    await connectDatabase();
    app.listen(config.port, "0.0.0.0", () => {
    console.log(
        `WorkFlowHub server running on port ${config.port} in ${config.nodeEnv} mode`
    );
});
};
startServer();
