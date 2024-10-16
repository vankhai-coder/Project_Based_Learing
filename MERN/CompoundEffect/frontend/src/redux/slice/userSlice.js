import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: ((state, action) => {
            state.user = action.payload
        }),
        logout: ((state) => {
            state.user = null
        }),
        
    }

})

export const { login, logout } = userSlice.actions
export default userSlice.reducer