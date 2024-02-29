const {
  admin: Admin,
  adminRole: AdminRole,
  adminPermission: AdminPermission,
} = require("#models");
const QueryHelper = require("#helpers/QueryHelper");

const AdminService = {
  // PROPERTIES
  includeModels: [
    {
      model: AdminRole,
      include: {
        model: AdminPermission,
        through: { attributes: [] },
      },
    },
  ],

  // METHODS
  async create(payload) {
    return await Admin.create(payload);
  },

  async list(query) {
    const { rows, count } = await Admin.findAndCountAll({
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

  async findById(adminId) {
    return await Admin.findOne({
      where: { id: adminId },
      include: AdminService.includeModels,
    });
  },

  async findByEmail(email) {
    return await Admin.findOne({
      where: { email },
      include: AdminService.includeModels,
    });
  },

  async update(adminId, payload) {
    return await Admin.update(payload, {
      where: {
        id: adminId,
      },
    });
  },

  async delete(adminId) {
    return await Admin.destroy({
      where: {
        id: adminId,
      },
    });
  },
};

module.exports = AdminService;
