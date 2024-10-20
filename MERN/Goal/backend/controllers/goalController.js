const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @@ desc get Goals 
// @@ route GET /api/goals 
// @@ access privates
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

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
        text: req.body.text
    })

    res.status(200).json(goal)
})

// @@ desc update Goals 
// @@ route PUT /api/goals:id 
// @@ access private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoal)
})

// @@ desc delete Goals 
// @@ route DELETE /api/goals:id 
// @@ access private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
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