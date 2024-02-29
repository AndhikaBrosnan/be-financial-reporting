require("dotenv").config();
require("#helpers/Logger");

const express = require("express");
require("express-async-errors");
const cors = require("cors");
const Prometheus = require("prom-client");
Prometheus.collectDefaultMetrics({
  prefix: `${process.env.APP_NAME}_${process.env.NODE_ENV}_`,
});

const sanitizer = require("#middlewares/request-sanitizer");
const serializer = require("#middlewares/response-serializer");
const {
  startMonitor,
  calculateResponse,
} = require("#middlewares/performance-monitoring");

const badRequestHandler = require("#errors/handlers/bad-request");
const generalErrorHandler = require("#errors/handlers/general-error");
const sequelizeHandler = require("#errors/handlers/sequelize");
const webhookNotifierHandler = require("#errors/handlers/webhook-notifier");

const scheduler = require("./scheduler");

const app = express();
const port = process.env.PORT || 3010;
const router = require("#routers");

app.set("trust proxy", true);
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sanitizer);
app.use(serializer);
app.use(startMonitor);

// ROUTERS
app.use(router);

app.use(calculateResponse);

// ERROR HANDLERS
app.use(badRequestHandler);
app.use(generalErrorHandler);
app.use(sequelizeHandler);
app.use(webhookNotifierHandler);

app.listen(port, () => {
  console.log("Listening on port " + port);
});

scheduler.start();
