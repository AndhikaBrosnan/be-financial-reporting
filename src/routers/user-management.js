const express = require('express')
const router = express.Router()
const UserController = require('#controllers/user')
const getPermission = require('#middlewares/permission-authentication')

/**
 * Permission middleware examples
 * allow permission if admin have one of the authorizedFeatures
 * (using OR conditional, not AND)
 */

router.post('/', getPermission(['create user']), UserController.create)
router.get('/', getPermission(['read user']), UserController.list)
router.get('/:userId', getPermission(['read user']), UserController.findById)
router.patch('/:userId', getPermission(['edit user']), UserController.update)
router.delete(
  '/:userId',
  getPermission(['delete user']),
  UserController.delete
)

module.exports = router
