const { adminPermission: AdminPermission } = require('#models')
const QueryHelper = require('#helpers/QueryHelper')

const AdminPermissionService = {
  async list (query) {
    const { rows, count } = await AdminPermission.findAndCountAll({
      ...QueryHelper.getPaginationQuery(query),
      order: [...QueryHelper.getSortQuery(query)],

      // TODO: FILTERS
      // TODO: SEARCH
      distinct: 'id'
    })

    return {
      data: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count)
    }
  }
}

module.exports = AdminPermissionService
