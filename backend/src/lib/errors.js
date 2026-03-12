export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || "Unexpected server error",
    details: err.details || null
  });
};

export const logInfo = (message, payload = {}) => {
  console.log(JSON.stringify({ level: "info", message, ...payload }));
};

export const logError = (message, payload = {}) => {
  console.error(JSON.stringify({ level: "error", message, ...payload }));
};
