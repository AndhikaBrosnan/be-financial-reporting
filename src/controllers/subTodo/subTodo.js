const CreateSchema = require("./subTodo-create-schema");
const UpdateSchema = require("./subTodo-update-schema");
const SubTodoService = require("#services/subTodo");
const { validationResult } = require("express-validator");

module.exports = class Controller {
  static async create(req, res) {
    // const errors = validationResult(req);
    // console.error("[debug]: error validationResult: ", errors);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { body } = await req;
    req.sanitize(CreateSchema, body);
    const created = await SubTodoService.create(body);

    console.log("[debug] response dari created: ", created);

    return res.serializePost({
      subTodoId: created.id,
    });
  }

  static async list(req, res) {
    const { params } = req;
    // return;
    const { todoId } = params;

    try {
      const {
        data: subTodos,
        totalData,
        totalPage,
      } = await SubTodoService.findByTodoId(todoId);

      return res.serialize({
        subTodos,
        totalData,
        totalPage,
      });
    } catch (error) {
      console.error("[error] error: ", error);
    }
  }

  static async findById(req, res) {
    const { params } = req;
    const { todoId } = params;

    const subTodo = await SubTodoService.findById(todoId);
    return res.serialize({
      subTodo,
    });
  }

  static async update(req, res) {
    const { params, body } = req;
    s;
    const { subTodoId } = params;
    req.sanitize(UpdateSchema, body);

    await SubTodoService.update(subTodoId, body);

    return res.serialize({
      subTodoId,
    });
  }

  static async delete(req, res) {
    const { params } = req;
    const { subTodoId } = params;
    await SubTodoService.delete(subTodoId);

    return res.serialize({
      subTodoId,
    });
  }
};
