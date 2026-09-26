const app = require("./app");
const config = require("./config/env");
app.listen(config.port,()=>{
    console.log(`WorkflowHub server running on port ${config.port} in ${config.nodeEnv} mode`);
});
