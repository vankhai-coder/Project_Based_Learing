const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header : 
            token = req.headers.authorization.split(' ')[1]

            // verify token : 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token : 
            const user = await User.findById(decoded.id).select('-password')
            if (!user) {
                throw new Error('This token is valid , but can not find that id')
            } else {
                req.user = user 
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect
}