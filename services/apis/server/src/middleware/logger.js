const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Utility function to get client IP
const getClientIP = req => {
  return (
    req.ip ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.headers["x-real-ip"] ||
    "unknown"
  );
};

// Utility function to format timestamp
const formatTimestamp = () => {
  return new Date().toISOString();
};

// Utility function to write to log file
const writeToLogFile = logEntry => {
  const logFileName = `app-${new Date().toISOString().split("T")[0]}.log`;
  const logFilePath = path.join(logsDir, logFileName);

  fs.appendFile(logFilePath, logEntry + "\n", err => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
};

// Main logging middleware
const loggingMiddleware = (options = {}) => {
  const {
    logToFile = true,
    logToConsole = true,
    includeBody = false,
    includeHeaders = false,
    skipPaths = ["/health", "/favicon.ico"],
    logLevel = "info",
  } = options;

  return (req, res, next) => {
    // Skip logging for specified paths
    if (skipPaths.includes(req.path)) {
      return next();
    }

    const startTime = Date.now();
    const timestamp = formatTimestamp();
    const clientIP = getClientIP(req);

    // Store original res.end to intercept response
    const originalEnd = res.end;
    let responseBody = "";

    // Intercept response body if needed
    if (includeBody) {
      const originalSend = res.send;
      res.send = function (body) {
        responseBody = body;
        return originalSend.call(this, body);
      };
    }

    // Override res.end to capture response details
    res.end = function (chunk, encoding) {
      const duration = Date.now() - startTime;

      // Build log entry
      const logData = {
        timestamp,
        method: req.method,
        url: req.originalUrl || req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        clientIP,
        userAgent: req.headers["user-agent"] || "unknown",
        contentLength: res.get("content-length") || "0",
      };

      // Add optional fields
      if (includeHeaders) {
        logData.requestHeaders = req.headers;
        logData.responseHeaders = res.getHeaders();
      }

      if (includeBody && req.body && Object.keys(req.body).length > 0) {
        logData.requestBody = req.body;
      }

      if (includeBody && responseBody) {
        logData.responseBody = responseBody;
      }

      // Format log entry
      const logEntry = `[${timestamp}] ${req.method} ${
        req.originalUrl || req.url
      } - ${res.statusCode} - ${duration}ms - ${clientIP}`;
      const detailedLogEntry = JSON.stringify(logData, null, 2);

      // Log to console
      if (logToConsole) {
        const colorCode =
          res.statusCode >= 400
            ? "\x1b[31m"
            : res.statusCode >= 300
            ? "\x1b[33m"
            : "\x1b[32m";
        const resetCode = "\x1b[0m";
        console.log(`${colorCode}${logEntry}${resetCode}`);
      }

      // Log to file
      if (logToFile) {
        writeToLogFile(detailedLogEntry);
      }

      // Call original res.end
      return originalEnd.call(this, chunk, encoding);
    };

    next();
  };
};

// Error logging middleware (should be used after your error handler)
const errorLoggingMiddleware = (err, req, res, next) => {
  const timestamp = formatTimestamp();
  const clientIP = getClientIP(req);

  const errorLog = {
    timestamp,
    error: {
      message: err.message,
      stack: err.stack,
      name: err.name,
    },
    request: {
      method: req.method,
      url: req.originalUrl || req.url,
      headers: req.headers,
      body: req.body,
      clientIP,
    },
  };

  const errorLogEntry = `[${timestamp}] ERROR: ${err.message} - ${req.method} ${
    req.originalUrl || req.url
  } - ${clientIP}`;

  // Log error to console
  console.error("\x1b[31m%s\x1b[0m", errorLogEntry);
  console.error(err.stack);

  // Log error to file
  const errorFileName = `errors-${new Date().toISOString().split("T")[0]}.log`;
  const errorFilePath = path.join(logsDir, errorFileName);

  fs.appendFile(
    errorFilePath,
    JSON.stringify(errorLog, null, 2) + "\n",
    writeErr => {
      if (writeErr) {
        console.error("Error writing to error log file:", writeErr);
      }
    }
  );

  next(err);
};

module.exports = {
  loggingMiddleware,
  errorLoggingMiddleware,
};
