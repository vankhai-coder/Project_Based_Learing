import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token
    try {
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized - no token provider' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Unauthorized - invalid token' })
        }
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log("error when verify token : ", error.message)
        res.status(500).json({success : false , message : 'Server error'})
    }
}