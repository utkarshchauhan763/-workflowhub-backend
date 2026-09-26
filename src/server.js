const app = require("./app");
const config = require("./config/env");
const connectDatabase = require("./config/database");


const startServer = async() => {
    await connectDatabase();
    app.listen(config.port, () => {
        console.log(`WorkflowHub server running on port ${config.port} in ${config.nodeEnv} mode`
        );
    });
};
startServer();
