const express = require('express')
const router = express.Router()

const AdminRoleController = require('#controllers/adminRole')

router.post('/', AdminRoleController.create)
router.get('/', AdminRoleController.list)
router.get('/:adminRoleId', AdminRoleController.findById)
router.patch('/:adminRoleId', AdminRoleController.update)
router.delete('/:adminRoleId', AdminRoleController.delete)

module.exports = router
