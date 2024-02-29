const CreateSchema = require("./todo-create-schema");
const UpdateSchema = require("./todo-update-schema");
const TodoService = require("#services/todo");

module.exports = class Controller {
  static async create(req, res) {
    const { body } = req;

    req.sanitize(CreateSchema, body);

    const created = await TodoService.create(body);

    return res.serializePost({
      todoId: created.id,
    });
  }

  static async list(req, res) {
    const { query } = req;
    const { data: todos, totalData, totalPage } = await TodoService.list(query);

    // return subTodo as well

    return res.serialize({
      todos,
      totalData,
      totalPage,
    });
  }

  static async findById(req, res) {
    const { params } = req;
    const { todoId } = params;

    const todo = await TodoService.findById(todoId);

    // return subTodo as well

    return res.serialize({
      todo,
    });
  }

  static async update(req, res) {
    const { params, body } = req;
    const { todoId } = params;
    req.sanitize(UpdateSchema, body);

    const updatedRespServ = await TodoService.update(todoId, body);

    return res.serialize({
      todoId,
    });
  }

  static async delete(req, res) {
    const { params } = req;
    const { todoId } = params;
    await TodoService.delete(todoId);

    return res.serialize({
      todoId,
    });
  }
};
