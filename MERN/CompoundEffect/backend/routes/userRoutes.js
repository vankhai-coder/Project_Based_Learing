const express = require('express')
// controllers : 
const { login, signup } = require('../controllers/userController')
const router = express.Router()

// login : 
router.post('/login', login)

// signup : 
router.post('/signup', signup)

module.exports = router