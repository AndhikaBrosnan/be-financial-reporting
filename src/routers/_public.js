const express = require('express')
const router = express.Router()

const RootController = require('#controllers/root')
const AuthController = require('#controllers/auth')
const ErrorReportController = require('#controllers/errorReport')
const AdminAuthController = require('#controllers/authAdmin')

router.get('/', RootController.root)
router.get('/metrics', RootController.monit)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/forgot-password', AuthController.changePassword)
router.post('/report/error/public', ErrorReportController.createPublic)

router.post('/admin-login', AdminAuthController.login)

module.exports = router
