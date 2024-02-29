const { todo: Todo, subTodo: SubTodo } = require("#models");
const QueryHelper = require("#helpers/QueryHelper");

const TodoService = {
  // PROPERTIES
  filterAttributes: ["task", "isDone"],
  searchAttributes: ["task", "isDone"],
  booleanAttributes: ["isDone"],
  async create(payload) {
    return await Todo.create(payload);
  },

  async list(query = {}) {
    const { filterAttributes, booleanAttributes, searchAttributes } =
      TodoService;

    const { rows, count } = await Todo.findAndCountAll({
      ...QueryHelper.getPaginationQuery(query),
      order: [...QueryHelper.getSortQuery(query)],
      where: {
        ...QueryHelper.getSearchQuery(query, { searchAttributes }),
        ...QueryHelper.getFilterQuery(query, {
          filterAttributes,
          booleanAttributes,
        }),
      },
      include: [SubTodo],
      distinct: "id",
    });

    return {
      data: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count),
    };
  },
  async findById(id) {
    return await Todo.findOne({
      where: {
        id,
      },
    });
  },
  async update(id, payload) {
    return await Todo.update(payload, {
      where: { id },
    });
  },

  async delete(id) {
    return await Todo.destroy({
      where: { id },
    });
  },
  async unselectAll(userId) {
    return await Todo.update(
      { isSelected: false },
      {
        where: {
          userId,
        },
      }
    );
  },
};

module.exports = TodoService;
