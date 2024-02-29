const express = require("express");
const router = express.Router();

const errorReportController = require("#controllers/errorReport");
const userAuthentication = require("#middlewares/user-authentication");
const userAddressRouter = require("./user-address");
const todoRouter = require("./todo");
const subTodoRouter = require("./subTodo");
const ledgerRouter = require("./ledger");

router.post(
  "/report/error/authenticated",
  errorReportController.createAuthenticated
);
router.use("/user-address", userAuthentication, userAddressRouter);
router.use("/todo", userAuthentication, todoRouter);
router.use("/subtodo", userAuthentication, subTodoRouter);
router.use("/ledger", userAuthentication, ledgerRouter);

module.exports = router;
