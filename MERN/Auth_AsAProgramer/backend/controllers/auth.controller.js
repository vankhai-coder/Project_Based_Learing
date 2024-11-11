import bcryptjs from 'bcryptjs'
import crypto from 'crypto'

import { User } from '../models/user.model.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail } from '../mailtrap/email.js'

export const signup = async (req, res) => {
    const { email, password, name } = req.body
    try {
        // check all fields :
        if (!email || !password || !name) {
            throw new Error('All fields are required')
        }
        // check user exist :
        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: 'User already exists' })
        }
        // hash password : 
        const hashedPassword = await bcryptjs.hash(password, 10)
        // create random 6 digits :
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        // create user :
        const user = new User({
            email,
            name,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,// 24 hours 
        })
        // save to db : 
        await user.save()
        //  generate jwt and put it on cookie :
        generateTokenAndSetCookie(res, user.id)
        // send email : 
        await sendVerificationEmail(user.email, verificationToken)
        // response :
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
export const verifyEmail = async (req, res) => {
    const { code, email } = req.body
    try {
        if (!email || !code) {
            throw new Error('All fields are required')
        }
        const user = await User.findOne({
            email,
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification code' })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()
        await sendWelcomeEmail(user.email, user.name)

        res.status(200).json({
            success: true,
            message: 'Verify email successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log('error in verifyEmail :', error.message)
        res.status(400).json({ success: false, message: error.message })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    
    try {
        if (!email || !password) {
            throw new Error('All fields are required')
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credential' })
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid credential' })
        }
        generateTokenAndSetCookie(res, user.id)
        user.lastLogin = new Date()
        await user.save()

        res.status(201).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log('error login: ', error.message);
        res.status(400).json({ success: false, message: error.message })
    }
}
export const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ success: true, message: 'Logout successfully' })
}
export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' })
        }
        // generate reset token : 
        const resetPasswordToken = crypto.randomBytes(20).toString('hex')

        user.resetPasswordToken = resetPasswordToken
        user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 day
        // save user :
        await user.save()
        // send reset password email : 
        await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}/${email}`)
        // response :
        res.status(200).json({ success: true, message: 'Password reset link have to your email' })
    } catch (error) {
        console.log('Error in forgotPassword :', error.message)
        res.status(400).json({ success: false, message: error.message })
    }
}
export const resetPassword = async (req, res) => {
    const { password,token, email } = req.body
    try {
        if (!password) {
            throw new Error('All fields are required')
        }
        const user = await User.findOne({
            email,
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ sucess: false, message: 'Invalid or expires reset token ' })
        }
        // update password : 
        const hashedPassword = await bcryptjs.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        // save user :
        await user.save()
        // send success :
        await sendResetSuccessEmail(user.email)
        // response :
        res.status(200).json({ success: true, message: 'Password reset successfully' })
    } catch (error) {
        console.log('Error in resetPassword :', error.message)
        res.status(400).json({ success: false, message: error.message })
    }
}
export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' })
        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log('error in check auth :', error.message)
        res.status(400).json({ success: false, message: error.message })
    }
}