import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'loggedUser',
    initialState: [],
    reducers: {
        setLoggedUser(state, action) {
            return action.payload
        }
    }
})
export const { setLoggedUser } = userSlice.actions
export default userSlice.reducer