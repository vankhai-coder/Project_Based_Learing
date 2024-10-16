import { useState } from "react"
import { useDispatch } from 'react-redux'
import { login } from '../redux/slice/userSlice'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch()

    const signup = async (email, password) => {
        try {
            setIsLoading(true)
            setError(false)

            const response = await fetch('http://localhost:4000/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const result = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(result.error)
            }

            if (response.ok) {
                //  save user to local storage : 
                localStorage.setItem('user', JSON.stringify(result))

                // update user state in redux store : 
                dispatch(login(result))

                setError(false)
                setIsLoading(false)

            }
        } catch (error) {
            console.log(error);
            
            setError(error.message)
            setIsLoading(false)
        }

    }
    return { error, isLoading, signup }

}