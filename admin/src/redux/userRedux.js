import {createSlice} from "@reduxjs/toolkit";
const intitalUser = {
    currentUser: null,
    isFetching:false,
    error:false
}
const userSlice = createSlice({
    name:"user",
    initialState:intitalUser,
    reducers:{
        loginStart:(state)=>{
            state.isFetching = true
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload
        },
        loginFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        }
    }
});
export const {loginStart, loginSuccess , loginFailure} = userSlice.actions;
export default userSlice.reducer;