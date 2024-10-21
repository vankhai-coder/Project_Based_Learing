const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

// connect database : 
connectDB()

const app = express()

// middleware : 
app.use(express.urlencoded({ extended: false }))

// routes : 
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// error handler : 
app.use(errorHandler)

// 
app.listen(port, () => console.log(`Server start on port ${port}`))
