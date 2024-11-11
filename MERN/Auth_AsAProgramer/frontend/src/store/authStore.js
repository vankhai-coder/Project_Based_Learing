import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'
axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
    signup: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name })
            set({ user: response.data.user, isLoading: false })
        } catch (error) {
            set({ error: (error.response && error.response.data && error.response.data.message) || "Error signing up", isLoading: false })
            throw error
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: false })
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password })
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: false,
                isLoading: false,
            })
        } catch (error) {
            console.log(error)
            set({
                isLoading: false,
                error: error.response?.data?.message || 'Error in logging in',
            })
            throw error
        }

    }
    ,
    verifyEmail: async (email, code) => {
        set({ isLoading: false, error: false })
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code, email })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            return response.data
        } catch (error) {
            set({ error: (error.response && error.response.data && error.response.data.message) || 'Error verifying email', isLoading: false })
            throw error
        }
    },
    checkAuth: async () => {
        // await new Promise(resolve => setTimeout(() => { resolve() }, 1000))
        set({ isCheckingAuth: true, error: false })
        try {
            const response = await axios.get(`${API_URL}/check-auth`)
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            console.log(error);
            set({ error: null, isCheckingAuth: false, isAuthenticated: false })
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null, message: null })

        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email })
            set({ isLoading: false, message: response.data.message })
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || 'Error sending reset password email' })
            throw error
        }

    },
    resetPassword: async (email, token, password) => {
        set({ isLoading: true, error: null, message: null })
        try {
            const response = await axios.post(`${API_URL}/reset-password`, { password, email, token })
            set({ isLoading: false, message: response?.data?.message })
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || 'Error resetting password' })
            throw error
        }
    }
}))