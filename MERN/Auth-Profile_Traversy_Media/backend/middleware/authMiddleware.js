import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authoried , invalid token')
        }
    } else {
        res.status(401)
        throw new Error('Not authouried , no token')
    }
})

export { protect }