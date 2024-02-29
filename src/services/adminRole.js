const {
  adminRole: AdminRole,
  adminPermission: AdminPermission,
  adminRolePermission: AdminRolePermission,
} = require("#models");
const QueryHelper = require("#helpers/QueryHelper");
const { sequelize } = require("#models");

const AdminRoleService = {
  // PROPERTIES
  includeModels: [
    {
      model: AdminPermission,
      through: { attributes: [] },
    },
  ],

  // METHODS
  async create(payload) {
    let createdId;

    await sequelize.transaction(async (transaction) => {
      const { adminPermissionIds, ...rest } = payload;

      const created = await AdminRole.create(rest, {
        transaction,
      });
      createdId = created.id;

      await AdminRoleService.setAdminRolePermissions(
        created.id,
        adminPermissionIds,
        transaction
      );
    });

    return AdminRoleService.findById(createdId);
  },

  async list(query) {
    const { rows, count } = await AdminRole.findAndCountAll({
      ...QueryHelper.getPaginationQuery(query),
      order: [...QueryHelper.getSortQuery(query)],

      // TODO: FILTERS
      // TODO: SEARCH
      include: AdminRoleService.includeModels,
      distinct: "id",
    });

    return {
      data: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count),
    };
  },

  async findById(adminRoleId) {
    return await AdminRole.findOne({
      where: { id: adminRoleId },
      include: AdminRoleService.includeModels,
    });
  },

  async findByEmail(email) {
    return await AdminRole.findOne({
      where: { email },
      include: AdminRoleService.includeModels,
    });
  },

  async update(adminRoleId, payload) {
    await sequelize.transaction(async (transaction) => {
      const { adminPermissionIds, ...rest } = payload;

      await AdminRole.update(rest, {
        where: {
          id: adminRoleId,
        },
        transaction,
      });

      if (adminPermissionIds) {
        await AdminRoleService.setAdminRolePermissions(
          adminRoleId,
          adminPermissionIds,
          transaction
        );
      }
    });

    return AdminRoleService.findById(adminRoleId);
  },

  async delete(adminRoleId) {
    return await AdminRole.destroy({
      where: {
        id: adminRoleId,
      },
    });
  },

  async setAdminRolePermissions(
    adminRoleId,
    adminPermissionIds = [],
    transaction
  ) {
    await AdminRolePermission.destroy({
      where: {
        adminRoleId,
      },
      ...(transaction ? { transaction } : {}),
    });

    for (const adminPermissionId of adminPermissionIds) {
      await AdminRolePermission.create(
        {
          adminRoleId,
          adminPermissionId,
        },
        {
          ...(transaction ? { transaction } : {}),
        }
      );
    }
  },
};

module.exports = AdminRoleService;
