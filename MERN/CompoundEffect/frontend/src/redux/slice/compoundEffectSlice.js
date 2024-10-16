import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// async function: 
export const loadHistory = createAsyncThunk('loadHistory', (async (_, { getState }) => {
    const state = getState()
    const token = state.user.user.token
    // Delay function to wait for 5 seconds
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Wait for 5 seconds
    await delay(1000);
    const response = await fetch('http://localhost:4000/api/compoundEffects', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    console.log('Load history!');

    if (!response.ok) {
        throw new Error(data.error)
    }
    return data
}))

export const deleteCe = createAsyncThunk('deleteCe', (async (id, { getState }) => {
    const state = getState()
    const token = state.user.user.token
    // Delay function to wait for 5 seconds
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Wait for 5 seconds
    await delay(1500);
    const response = await fetch('http://localhost:4000/api/compoundEffects/' + id, {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    console.log('delete ce! : ', data);

    if (!response.ok) {
        throw new Error(data.error)
    }
    return data
}))

const compoundEffectSlice = createSlice({
    name: 'compoundEffect',
    initialState: {
        history: '',
        loading: true,
        error: false,
        deleteLoading: false,
        deleteError: false,
    },
    reducers: {
        add: ((state, action) => {
            console.log('action.payload : ', action.payload);

            state.history = (state.history === '' ? [action.payload] : [action.payload, ...state.history])
        }),
        clear: (state) => {
            state.history = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadHistory.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(loadHistory.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.history = action.payload
            })
            .addCase(loadHistory.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            // delete : 
            .addCase(deleteCe.pending, (state) => {
                state.deleteLoading = true
                state.deleteError = false
            })
            .addCase(deleteCe.fulfilled, (state, action) => {
                state.deleteLoading = false
                state.deleteError = false
                state.deleteSuccess = true
                state.history = state.history.filter(h => h._id !== action.payload._id)
            })
            .addCase(deleteCe.rejected, (state) => {
                state.deleteLoading = false
                state.deleteError = true
            })
    }
});

export const { add , clear } = compoundEffectSlice.actions;
export default compoundEffectSlice.reducer;
