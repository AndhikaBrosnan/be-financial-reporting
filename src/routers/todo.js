const express = require("express");
const router = express.Router();

const TodoController = require("#controllers/todo");

router.post("/", TodoController.create);
router.get("/", TodoController.list);
router.get("/:todoId", TodoController.findById);
router.patch("/:todoId", TodoController.update);
router.delete("/:todoId", TodoController.delete);

module.exports = router;
