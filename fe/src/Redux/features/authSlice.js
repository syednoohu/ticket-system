import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { currentUser: null, tokenExist :false},
    reducers: {
        setUser: (state, action) => {
            const { user, tokenExist } = action.payload
            state.currentUser = user
            tokenExist ? 
                state.tokenExist = true : 
                state.tokenExist = false
        },
        logOut: (state, action) => {
            state.currentUser = null
            state.tokenExist = false

        },
    }
})

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token