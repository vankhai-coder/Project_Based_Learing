const express = require('express')
const { creteNewCompoundEffect, deleteCompoundEffect, getAllCompoundEffects } = require('../controllers/compoundEffectController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all request : 
router.use(requireAuth)

// get all compound effects : 
router.get('/', getAllCompoundEffects)

// delete one : 
router.delete('/:id', deleteCompoundEffect)

// post one :  
router.post('/', creteNewCompoundEffect)

module.exports = router