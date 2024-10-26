import { configureStore } from '@reduxjs/toolkit';
import compoundEffectReducer from './slice/compoundEffectSlice'
import userReducer from './slice/userSlice'

export const store = configureStore({
    reducer: {
        compoundEffect: compoundEffectReducer,
        user: userReducer
    }
});
