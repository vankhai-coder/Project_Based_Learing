import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const RedirectAuthenticatedUser = ({ children }) => {
    const { user, isAuthenticated } = useAuthStore()
    if (isAuthenticated && user.isVerified) {
        return <Navigate to='/' replace />
    }
    return children

}

export default RedirectAuthenticatedUser