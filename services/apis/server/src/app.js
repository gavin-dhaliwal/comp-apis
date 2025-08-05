const express = require("express");
const app = express();
const {
  loggingMiddleware,
  errorLoggingMiddleware,
} = require("./middleware/logger");

const { PORT = 8080 } = process.env;

const authRouter = require("./routers/auth.router");

app.use(express.json());

// Apply logging middleware
app.use(
  loggingMiddleware({
    logToFile: false,
    logToConsole: true,
    includeBody: true,
    includeHeaders: true,
  })
);

app.use("/ping", (_, res) =>
  res.status(200).send({
    version: require("../../package.json").version,
  })
);

app.use("/auth", authRouter);

app.use((_, res) => res.status(404).send({ error: "Not Found" }));

app.use(errorLoggingMiddleware);

app.listen(PORT, () => {
  console.info(`CompAPIs -> Listening on port ${PORT}`);
});

module.exports = app;
