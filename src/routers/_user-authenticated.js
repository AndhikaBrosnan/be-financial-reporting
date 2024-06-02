const express = require("express");
const router = express.Router();
const multer = require('multer')

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }
})

const errorReportController = require("#controllers/errorReport");
const userAuthentication = require("#middlewares/user-authentication");
const userAddressRouter = require("./user-address");
const todoRouter = require("./todo");
const subTodoRouter = require("./subTodo");
const ledgerRouter = require("./ledger");
const imageRouter = require("./image")


router.post(
  "/report/error/authenticated",
  errorReportController.createAuthenticated
);
router.use("/user-address", userAuthentication, userAddressRouter);
router.use("/todo", userAuthentication, todoRouter);
router.use("/subtodo", userAuthentication, subTodoRouter);
router.use("/ledger", userAuthentication, ledgerRouter);
router.use("/image", upload.single('image'), userAuthentication, imageRouter)

module.exports = router;
