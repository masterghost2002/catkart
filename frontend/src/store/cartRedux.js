import {createSlice} from "@reduxjs/toolkit";
const initalCart = {
    products:[],
    quantity:0,
    total:0,
    isUpdating: false,
    isError:false,
}
const cartSlice = createSlice({
    name:"cart",
    initialState:initalCart,
    reducers:{
        // perform durin logout
        clearCart:(state)=>{
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        // for api calls
        updateCartStart:(state)=>{
            state.isUpdating = true;
        },
        updateCartSuccess:(state, action)=>{
            state.isUpdating = false;
            state.isError = false;

            // pre fill during login from db
            if(action.payload){
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.quantity = action.payload.quantity;
            }
        },
        updateCartFailure:(state)=>{
            state.isUpdating = false;
            state.isError = true;
        },

        // cart handle local storage
        addProduct:(state, action)=>{
            state.products.push(action.payload);
            state.quantity = state.products.length;//cart quantity
            state.total+=(action.payload.price*action.payload.quantity);
        },
        // remove the product from the cart
        removeProduct:(state,action)=>{
            let item = state.products.find(product=>product._id === action.payload._id);
            state.total-=(item.price*item.quantity);
            state.products = state.products.filter(product=>product._id !== item._id);
            state.quantity = state.products.length;
        },

        // to do refactor
        // for inc and dec product quantity from cart
        updateProduct:(state, action)=>{
            let index = state.products.findIndex(product=>product._id=== action.payload._id);
            const price = Number(state.products[index].price);
            if(action.payload.type === "inc"){
                state.products[index].quantity++;
                state.total+=price;
            }
            else{
                if(state.products[index].quantity === 1) return;
                state.products[index].quantity--;
                state.total-=price;
            }
        }
    }
});
export const {updateCartStart,addProduct, removeProduct, updateProduct,
                 updateCartSuccess, updateCartFailure,
                clearCart
            } = cartSlice.actions;
export default cartSlice.reducer;