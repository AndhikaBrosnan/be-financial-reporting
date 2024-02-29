const { address: Address } = require("#models");
const QueryHelper = require("#helpers/QueryHelper");

const AddressService = {
  // PROPERTIES
  filterAttributes: [
    "urban",
    "district",
    "city",
    "province",
    "postalCode",
    "addressDetail",
    "isSelected",
  ],
  searchAttributes: [
    "urban",
    "district",
    "city",
    "province",
    "postalCode",
    "addressDetail",
  ],
  booleanAttributes: ["isSelected"], // #NOTES: kenapa harus ada booleanAttributes?

  // METHODS
  async create(payload) {
    return await Address.create(payload);
  },

  async list(userId, query = {}) {
    const { filterAttributes, booleanAttributes, searchAttributes } =
      AddressService;

    const { rows, count } = await Address.findAndCountAll({
      ...QueryHelper.getPaginationQuery(query),
      order: [...QueryHelper.getSortQuery(query)],
      where: {
        userId,
        /**
         * search first then filter to override filter with search,
         * filter can be adjusted/extended according to needs
         * examples: number value or multiple filters
         */
        ...QueryHelper.getSearchQuery(query, {
          searchAttributes,
        }),
        ...QueryHelper.getFilterQuery(query, {
          filterAttributes,
          booleanAttributes,
        }),
      },
      // subQuery: false FIXME:
      distinct: "id",
    });

    return {
      addresses: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count),
    };
  },

  async findById(id, userId) {
    return await Address.findOne({
      where: {
        id,
        userId,
      },
    });
  },

  async update(id, payload) {
    return await Address.update(payload, {
      where: { id },
    });
  },

  async delete(id) {
    return await Address.destroy({
      where: { id },
    });
  },

  async unselectAll(userId) {
    return await Address.update(
      { isSelected: false },
      {
        where: {
          userId,
        },
      }
    );
  },

  /**
   * notes:
   * if complex or multiple queries needed at the same time,
   * use sequelize transaction
   */
};

module.exports = AddressService;
