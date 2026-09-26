const express = require("express");
const healthRoutes = require("./routes/health.routes");
const errorMiddleware = require("./middleware/error.middleware");
const notFoundMiddleware = require("./middleware/notFound.middleware");
const app = express();
app.use(express.json());
app.use("/api/v1",healthRoutes);
// 404 error
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

module.exports = app;
