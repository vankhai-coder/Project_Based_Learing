import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @@desc register user
// @@route POST /api/users
// @@access public 
const registerUser = asyncHandler(async (req, res) => {
    let { name, email, password } = req.body
    // check all fields : 
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }
    // check user exist : 
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exist !')
    }
    try {
        // create new user : 
        const user = await User.create({
            name,
            email,
            password
        })
        // generate token and put on response object : 
        generateToken(res, user.id)
        // send user's data back : 
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        res.status(400)
        console.log(error.message);

        throw new Error('Invalid user data')
    }
})


// @@desc Auth user / set token 
// @@route POST /api/users/auth
// @@access public 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // check all fields : 
    if (!email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }
    const user = await User.findOne({ email })

    if (user && (await user.comparePassword(password))) {
        // generate token and put on response object : 
        generateToken(res, user.id)
        // send user's data back : 
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password ')
    }
})


// @@desc log out user
// @@route POST /api/users/logout
// @@access public 
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User logged out' })
})


// @@desc get user profile 
// @@route GET /api/users/profile
// @@access private 

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')

    if (user) {
        res.status(200).json({
            _id: user.id,
            email: user.email,
            name: user.name
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @@desc update user profile 
// @@route PUT /api/users/profile
// @@access private 

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}