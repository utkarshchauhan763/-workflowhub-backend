const notFoundMiddleware = (req,res,next) => {
    const error = new Error(`Router not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};
module.exports = notFoundMiddleware;