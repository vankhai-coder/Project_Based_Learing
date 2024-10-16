import { useDispatch } from "react-redux"
import { logout as logoutAction } from '../redux/slice/userSlice'
import { clear } from '../redux/slice/compoundEffectSlice'

const useLogout = () => {
    const dispatch = useDispatch()

    const logout = () => {
        // update local storage : 
        localStorage.removeItem('user')

        // update redux store for user : 
        dispatch(logoutAction())
        dispatch(clear())
    }
    return { logout }
}

export default useLogout