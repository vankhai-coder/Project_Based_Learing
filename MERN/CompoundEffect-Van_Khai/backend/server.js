require('dotenv').config()
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')

// express app : 
const app = express()
const compoundEffectRoutes = require('./routes/compoundEffectRoutes')
const userRoutes = require('./routes/userRoutes')

// Enable CORS for all routes
app.use(cors());

// middleware : 
app.use(express.json()) // parse req.body to JSON 

// connect to db : 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(4000, () => {
            console.log('connect to db and listening on port ', process.env.PORT);
        })
    })
    .catch(err =>
        console.log('error when connect db :', err)
    )

// logger : 
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

// routes : 
app.use('/api/compoundEffects', compoundEffectRoutes)
app.use('/api/user', userRoutes)

