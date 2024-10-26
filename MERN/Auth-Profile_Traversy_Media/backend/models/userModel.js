import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// user schema : 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// hash passdword : 
userSchema.pre('save', async function (next) {
    // Only hash password if it has been modified or is new
    if (!this.isModified('password')) {
        next()
    }
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// instance method to compare password : 
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// export 
const User = mongoose.model('User', userSchema)
export default User 