const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name field']
    },
    email: {
        type: String,
        required: [true, 'Please add an email field'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)