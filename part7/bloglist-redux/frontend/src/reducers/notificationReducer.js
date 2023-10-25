import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        hideNotification(state, action) {
            return state = ''
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(showNotification(text))
        setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer