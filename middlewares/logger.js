const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/errors.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/logs.log" }),
  ],
});

function logReqRes(req, res, next) {
  const log = `${req.method} | ${req.path}`;
  logger.info(log);
  next();
}

module.exports = { logReqRes };
