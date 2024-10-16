const { default: mongoose } = require('mongoose')
const CompoundEffect = require('../models/compoundEffectModel')

// get all , GET : 
const getAllCompoundEffects = async (req, res) => {
    try {
        const user_id = req.user._id
        const compoundEffects = await CompoundEffect.find({ user_id }).sort({ createdAt: -1 })
        if (compoundEffects) {
            res.status(200).json(compoundEffects)
        } else {
            res.status(400).json({ error: 'Can not found all' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// create new : 
const creteNewCompoundEffect = async (req, res) => {
    try {
        console.log('req.body :', req.body);
        // get value : 
        const { p, pmt, t, n, r } = req.body
        if (!p || !pmt || !t || !n || !r) {
            return res.status(400).json({ 'error': 'something undefiend or null in req.body' })
        }
        // caculate : 
        const { years, originalAmount, futureAmount } = CompoundEffect.caculateCE(p, pmt, t, n, r)
        // save to db : 
        const user_id = req.user._id
        const ce = await CompoundEffect.create({ years, originalAmount, futureAmount, user_id })
        // send data back to client :
        console.log('sent back data : ', years, originalAmount, futureAmount);

        res.status(201).json({ years, originalAmount, futureAmount, _id: ce._id })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: 'Error in server , please try again!' })
    }
}

// delete one : 
const deleteCompoundEffect = async (req, res) => {
    const id = req.params.id
    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const compoundEffect = await CompoundEffect.findByIdAndDelete(id)
            if (compoundEffect) {
                res.status(200).json(compoundEffect)
            } else {
                res.status(400).json({ error: 'Can not delete' })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    } else {
        res.status(400).json({ error: 'Id is not valid' })
    }
}

module.exports = { creteNewCompoundEffect, deleteCompoundEffect, getAllCompoundEffects }


