dotenv.config()
import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'

// init app: 
const app = express()

// connect db : 
connectDB()

// middleware : 
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Middleware to parse cookies
app.use(cookieParser());

// port : 
const port = process.env.PORT || 5000

// routes : 
app.use('/api/users', userRoutes)

// error handler : 
app.use(notFound)
app.use(errorHandler)

// app listening : 
app.listen(port, (req, res) => {
    console.log(`Server running on port : ${port}`)
})