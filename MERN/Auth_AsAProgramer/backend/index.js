import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './db/connectDB.js'
import authRoutes from './routes/auth.route.js'
import cors from 'cors'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

// middleware for parse req.body : 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// allow us to parse incoming cookie
app.use(cookieParser())
// Allow CORS for all domains
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// logging request : 
app.use((req, res, next) => {
    console.log('request info : ', req.method + ' ' + req.path)
    next()
})
// routes for auth :
app.use('/api/auth', authRoutes)

app.listen(PORT, async () => {
    await connectDB()
    console.log('server running on port:' + PORT);
})


