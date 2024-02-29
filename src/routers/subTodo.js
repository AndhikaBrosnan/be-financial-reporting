const express = require("express");
const router = express.Router();

const SubTodoController = require("#controllers/subTodo");

router.get("/:todoId", SubTodoController.list);
router.post("/:todoId/", SubTodoController.create);
router.patch("/:subTodoId", SubTodoController.update);
router.delete("/:subTodoId", SubTodoController.delete);

module.exports = router;
