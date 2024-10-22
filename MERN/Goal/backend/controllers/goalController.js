const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const mongoose = require('mongoose')

// @@ desc get Goals 
// @@ route GET /api/goals 
// @@ access privates
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

// @@ desc set Goals 
// @@ route POST /api/goals 
// @@ access private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text field ')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @@ desc update Goals 
// @@ route PUT /api/goals:id 
// @@ access private
const updateGoal = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(401)
        throw new Error('Invalid goal id ')
    }

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // make sure user update their own goal : 
    if (goal.user.toString() !== req.user.id) {
        req.status(401)
        throw new Error('USer not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoal)
})

// @@ desc delete Goals 
// @@ route DELETE /api/goals:id 
// @@ access private
const deleteGoal = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(401)
        throw new Error('Invalid goal id ')
    }

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    // make sure user delete their own goal : 
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('USer not authorized')
    }

    await goal.deleteOne({ _id: req.params.id })

    res.status(200).json({ id: req.params.id })
})




module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}