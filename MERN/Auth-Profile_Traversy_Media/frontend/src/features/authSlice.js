import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

// initialState : 
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const initialState = {
    user,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}
// logout : 
export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        await authService.logout()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
// register : 
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        // wait for 2 seconds to test loading icon : 
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
        return await authService.register(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
// login : 
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        // wait 2 seconds to test loading icon: 
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000);
        })
        return await authService.login(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update : 
export const update = createAsyncThunk('auth/update', async (userData, thunkAPI) => {
    console.log(userData)
    try {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
        return await authService.update(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// create slice : 
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = false
        }
    },
    extraReducers: (builder) => {
        builder
            // logout : 
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null
                state.message = action.payload
            })
            // register : 
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // login : 
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // update : 
            .addCase(update.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }

})


// export : 
export const { reset } = authSlice.actions
export default authSlice.reducer