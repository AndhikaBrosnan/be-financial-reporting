const express = require('express')
const router = express.Router()

const AddressController = require('#controllers/address')

router.post('/', AddressController.create)
router.get('/', AddressController.list)
router.get('/:addressId', AddressController.findById)
router.patch('/:addressId', AddressController.update)
router.delete('/:addressId', AddressController.delete)

module.exports = router
