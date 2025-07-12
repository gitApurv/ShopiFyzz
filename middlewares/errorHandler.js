const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const errMessage = error.message || "Internal Server Error";
  res.status(statusCode).json({
    ok: false,
    message: errMessage,
  });
};

module.exports = errorHandler;
