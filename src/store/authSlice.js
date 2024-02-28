import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    status: false
} 
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
        login(state, action) {
            // console.log('slice: ',action.payload.userData)
            state.userData = action.payload.userData;
            state.status = true;
        },
        logout(state) {
            // console.log( 'logout:  ',state.userData)
            state.userData = {};
            state.status = false;
        }
    }
})
export const { login, logout }=authSlice.actions
export default authSlice.reducer 