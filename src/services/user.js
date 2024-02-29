const { user: User, address: Address } = require("#models");
const QueryHelper = require("#helpers/QueryHelper");

const UserService = {
  // PROPERTIES
  includeModels: [
    {
      model: Address,
    },
  ],

  // METHODS
  async create(payload) {
    return await User.create(payload);
  },

  async list(query) {
    const { rows, count } = await User.findAndCountAll({
      ...QueryHelper.getPaginationQuery(query),
      order: [...QueryHelper.getSortQuery(query)],

      // TODO: FILTERS
      // TODO: SEARCH
      distinct: "id",
    });

    return {
      data: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count),
    };
  },

  async findById(userId) {
    return await User.findOne({
      where: { id: userId },
      include: UserService.includeModels,
    });
  },

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  },

  async update(userId, payload) {
    return await User.update(payload, {
      where: { id: userId },
    });
  },

  async delete(userId) {
    return await User.destroy({
      where: { id: userId },
    });
  },
};

module.exports = UserService;
