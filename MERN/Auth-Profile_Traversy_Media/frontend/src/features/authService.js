import axios from 'axios'

const API_URL = '/api/users/'
// logout : 
const logout = async () => {
    localStorage.removeItem('user')
    const response = await axios.post(API_URL + 'logout')
    return response.data
}
// register :
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
// login : 
const login = async (userData) => {
    const response = await axios.post(API_URL + 'auth', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
// update : 
const update = async (userData) => {
    const response = await axios.put(API_URL + 'profile', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// export  : 
const authService = {
    logout,
    register,
    login,
    update
}
export default authService 