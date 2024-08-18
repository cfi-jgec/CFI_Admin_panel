
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userSlice {
    user: null | any,
    tempUserDetails: any
}

const initialState: userSlice = {
    user: null,
    tempUserDetails: null
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LoginUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload.user;
        },
        registerUser: (state, action: PayloadAction<any>) => {
            console.log(action.payload)
            state.tempUserDetails = action.payload;
        },
        resetDate: (state, action: PayloadAction) => {
            state.tempUserDetails = null;
        },
        LogOutUser: (state) => {
            state.user = null;
        }
    },
})

export const { LoginUser, registerUser, resetDate, LogOutUser } = UserSlice.actions
export default UserSlice.reducer