import {createSlice} from "@reduxjs/toolkit";
const intitalUser = {
    currentUser: null,
    isFetching:false,
    error:false,
    errorInfo:{}
}
const userSlice = createSlice({
    name:"user",
    initialState:intitalUser,
    reducers:{
        logOut:(state)=>{
            state.currentUser = null;
            localStorage.removeItem("accessToken");
        },
        loginStart:(state)=>{
            state.isFetching = true;
            state.error = false;
            state.errorInfo = {};
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false;
            state.error = false;
            state.currentUser = action.payload;
            state.errorInfo = {};
        },
        loginFailure:(state, action)=>{
            state.isFetching = false;
            state.error = true;
            state.errorInfo = action.payload;
        },
        updateUserStart:(state)=>{
            state.isFetching = true;
            state.error = false;
            state.errorInfo = {};
        },
        updateUserSuccess:(state, action)=>{
            state.isFetching = false;
            state.error = false;
            state.currentUser = action.payload;
            state.errorInfo = {};
        },
        updateUserFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        addItemToWishList:(state, action)=>{
            state.currentUser.wishlist.push(action.payload);
        },
        removeFromWishList:(state, action)=>{
            state.currentUser.wishlist = state.currentUser.wishlist.filter(product=>product._id!==action.payload._id);
        },
        updateWishList:(state,action)=>{
            state.currentUser.wishlist = action.payload;
        }
    }
});
export const {  
    loginStart, loginSuccess ,logOut,
    loginFailure, updateUserFailure, updateUserSuccess,
    updateUserStart, removeFromWishList, addItemToWishList,
    updateWishList

} = userSlice.actions;
export default userSlice.reducer;