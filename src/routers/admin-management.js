const express = require('express')
const router = express.Router()

const AdminController = require('#controllers/admin')

router.post('/', AdminController.create)
router.get('/', AdminController.list)
router.get('/:adminId', AdminController.findById)
router.patch('/:adminId', AdminController.update)
router.delete('/:adminId', AdminController.delete)

module.exports = router
