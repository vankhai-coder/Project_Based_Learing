import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const ProtectedRoute = ({ children }) => {
    const { user, isAuthenticated } = useAuthStore()
    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace />
    }
    if (!user.isVerified) {
        return <Navigate to={'/verify-email'} replace />
    }
    return children 

}

export default ProtectedRoute