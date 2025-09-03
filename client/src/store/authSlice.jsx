import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user_id: null,
        username: null,
        email: null,
        exp: null,
        location: null,
    },
    reducers: {
        setAuth : (state, action) => {
            state.token = action.payload.token
            state.user_id = action.payload.user_id
            state.username = action.payload.username
            state.email = action.payload.email
            state.exp = action.payload.exp
            state.location = action.payload.location
        }
    }
})

export const {setAuth} = authSlice.actions

export default authSlice.reducer;