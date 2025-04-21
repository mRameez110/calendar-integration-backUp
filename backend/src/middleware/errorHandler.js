const errorHandler = (err, req, res, next) => {
  const statusCode = err.errorCode || 500;
  const message = err.message || "Something went wrong";

  console.error(`[ERROR] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    success: false,
    errorMessage: message,
  });
};

module.exports = errorHandler;
