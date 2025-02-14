const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  exitOnError: false,
});

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: "An error occurred",
    error: err.message,
    stack: err.stack,
  });
  res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
