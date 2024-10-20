const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const app = express()

app.use(express.urlencoded({ extended: false }))

app.listen(port, () => console.log(`Server start on port ${port}`))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)