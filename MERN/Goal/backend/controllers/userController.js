const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @@ desc Register new user 
// @@ route POST /api/users 
// @@ access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    // check if user exist : 
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exist')
    }
    // hash password : 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } catch (error) {
        // Handle Mongoose validation errors or other types of errors
        if (error.name === 'ValidationError') {
            res.status(400)
            throw new Error('Validation error: ' + error.message)
        }
        res.status(500)
        console.log(error);

        throw new Error('Internal server error')
    }
})

// @@ desc Authenticate user 
// @@ route POST /api/users/login
// @@ access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // check for user email : 
    const user = await User.findOne({ email })
    if(!user){
        res.status(401)
        throw new Error('Can not find this email')
    }

    // compare : 
    const isMatch = (await bcrypt.compare(password, user.password))
    if (!isMatch) {
        res.status(400)
        throw new Error('Wrong password') // shoule be : Invalid credentials
    }
    if (user && isMatch) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @@ desc Get user data
// @@ route GET /api/users/me 
// @@ access private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })

})

// generate JWT : 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d' // 2 days
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}