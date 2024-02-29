const express = require('express')
const router = express.Router()
const publicRouter = require('./_public')
const userAuthenticatedRouter = require('./_user-authenticated')
const adminAuthenticatedRouter = require('./_admin-authenticated')

router.use(publicRouter)
router.use(userAuthenticatedRouter)
router.use(adminAuthenticatedRouter)

module.exports = router
