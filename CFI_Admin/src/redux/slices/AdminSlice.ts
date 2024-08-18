
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userSlice {
    loading: boolean,
    alert: null | object[];
    events: null | object[],
    notice: null | object[],
    projects: null | object[],
}

const initialState: userSlice = {
    loading: false,
    alert: null,
    events: null,
    notice: null,
    projects: null,
}

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        updateAlert: (state, action: PayloadAction<any>) => {
            state.alert = action.payload;
        },
        updateEvents: (state, action: PayloadAction<Object[]>) => {
            state.events = action.payload;
        },
        updateNotice: (state, action: PayloadAction<any>) => {
            state.notice = action.payload;
        },
        updateProjects: (state, action: PayloadAction<any>) => {
            state.events = action.payload;
        },
    },
})

export const { setLoading, updateAlert, updateEvents, updateNotice, updateProjects } = AdminSlice.actions
export default AdminSlice.reducer