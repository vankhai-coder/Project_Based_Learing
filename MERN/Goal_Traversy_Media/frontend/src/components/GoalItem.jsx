import { useDispatch } from "react-redux"
import { deleteGoal } from '../features/goals/goalSlice'


const GoalItem = ({ goal }) => {
    const dispatch = useDispatch()

    return (
        <div className="goal">
            <div>
                {new Intl.DateTimeFormat('vi-VN', {
                    timeZone: 'Asia/Ho_Chi_Minh',
                    dateStyle: 'short',
                    timeStyle: 'short'
                }).format(new Date(goal.createdAt))}
            </div>

            <h2>{goal.text}</h2>

            <button
                onClick={() => {
                    dispatch(deleteGoal(goal._id))
                }}
                className="close"
            >
                X
            </button>
        </div>
    )
}

export default GoalItem