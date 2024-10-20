const asyncHandler = require('express-async-handler')

// @@ desc get Goals 
// @@ route GET /api/goals 
// @@ access privates
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get goals' })
})

// @@ desc set Goals 
// @@ route POST /api/goals 
// @@ access private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text field ')
    }
    // console.log(req.body);

    res.status(200).json({ message: 'set goals' })
})

// @@ desc update Goals 
// @@ route PUT /api/goals:id 
// @@ access private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})

// @@ desc delete Goals 
// @@ route DELETE /api/goals:id 
// @@ access private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` })
})




module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}