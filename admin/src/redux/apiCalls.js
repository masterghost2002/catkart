import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { getProductStart, getProductSuccess, getProductFailure,
        deleteProductFailure, deleteProductStart, deleteProductSuccess,
        updateProductFailure, updateProductStart, updateProductSuccess,
        addProductFailure, addProductStart, addProductSuccess

    } from "./productRedux";
import {publicRequest, userRequest, multiPartRequest} from '../requestMethods';
export const login = async (dispatch, user, navigate)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    }catch(error){
        dispatch(loginFailure());
    }
};
export const getProducts = async (dispatch)=>{
    dispatch(getProductStart());
    try{
        const res = await publicRequest.get('/products');
        dispatch(getProductSuccess(res.data));
    }catch(error){
        dispatch(getProductFailure());
    }
};
export const deleteProduct = async (id, dispatch)=>{
    dispatch(deleteProductStart());
    try{
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(res.data));
    }catch(error){
        dispatch(deleteProductFailure());
    }
};
export const updateProduct = async (id, product, dispatch)=>{
    dispatch(updateProductStart());
    try{
        const res = await multiPartRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess(res.data));
    }catch(error){
        dispatch(updateProductFailure());
    }
};
export const addProduct = async (product, dispatch)=>{
    dispatch(addProductStart());
    try{
        const res = await multiPartRequest.post(`/products/`,product);
        dispatch(addProductSuccess(res.data));
    }catch(error){
        dispatch(addProductFailure());
    }
};