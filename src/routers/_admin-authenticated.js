const express = require('express')
const router = express.Router()
const adminAuthentication = require('#middlewares/admin-authentication')
const adminManagementRouter = require('./admin-management')
const adminRoleRouter = require('./admin-role')
const userManagementRouter = require('./user-management')
const AdminPermissionController = require('#controllers/adminPermission')

router.use('/admin-management', adminAuthentication, adminManagementRouter)
router.use('/admin-role', adminAuthentication, adminRoleRouter)
router.use('/user-management', adminAuthentication, userManagementRouter)

router.get(
  '/admin-permission',
  adminAuthentication,
  AdminPermissionController.list
)

module.exports = router
