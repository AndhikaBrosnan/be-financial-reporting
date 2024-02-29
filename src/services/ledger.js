const { ledger: Ledger } = require("#models");
const QueryHelper = require("#helpers/QueryHelper");
const db = require("#models");

const LedgerService = {
  // PROPERTIES
  filterAttributes: ["task", "isDone"],
  searchAttributes: ["task", "isDone"],
  booleanAttributes: ["isDone"],

  async create(payload) {
    let createdId;

    await db.sequelize.transaction(async (transaction) => {
      console.log("[debug] payload: ", payload);
      const { userId, ...rest } = payload;

      const created = await Ledger.create(payload, { transaction });
      createdId = created.id;
      return created.id;
    });

    return LedgerService.findById(createdId);
  },

  async list(query = {}) {
    const { filterAttributes, booleanAttributes, searchAttributes } =
      LedgerService;

    const { rows, count } = await Ledger.findAndCountAll({
      ...QueryHelper.getPaginationQuery(query),
      order: [...QueryHelper.getSortQuery(query)],
      where: {
        ...QueryHelper.getSearchQuery(query, { searchAttributes }),
        ...QueryHelper.getFilterQuery(query, {
          filterAttributes,
          booleanAttributes,
        }),
      },
      distinct: "id",
    });

    return {
      data: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count),
    };
  },

  async findById(id) {
    return await Ledger.findOne({
      where: {
        id,
      },
    });
  },

  async update(id, payload) {
    return await Ledger.update(payload, {
      where: { id },
    });
  },

  async delete(id) {
    return await Ledger.destroy({
      where: { id },
    });
  },
};

module.exports = LedgerService;
