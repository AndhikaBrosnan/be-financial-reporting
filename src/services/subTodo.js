const { subTodo: SubTodo, todo: Todo } = require("#models");

const SubTodoService = {
  // PROPERTIES
  filterAttributes: ["task"],
  searchAttributes: ["task"],
  booleanAttributes: ["isDone"],
  async create(payload) {
    console.log("[debug] payload: ", payload);

    return await SubTodo.create(payload);
  },

  async findByTodoId(todoId) {
    const { rows, count } = await SubTodo.findAndCountAll({
      where: {
        todoId,
      },
      // include: [Todo],
    });

    return { data: rows, totalData: count };
  },

  async update(id, payload) {
    return await SubTodo.update(payload, {
      where: { id },
    });
  },

  async delete(id) {
    return await SubTodo.destroy({
      where: { id },
    });
  },
};

module.exports = SubTodoService;
