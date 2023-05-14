import { loginFailure, loginStart, loginSuccess, updateUserFailure, updateUserSuccess, updateUserStart } from "./userSlice";
import { updateCartStart, updateCartSuccess, updateCartFailure } from "./cartRedux";
import { publicRequest, userRequest } from '../requestMethods';

// form validation
const validateForm = (userInfo, setErrorInfo) => {
    console.log(userInfo.fullname);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    if (!userInfo.fullname || userInfo.fullname.trim(" ").length === 0) {
        setErrorInfo({
            isError: true,
            errorFor: "fullname",
            errorMessage: "Fullname is required"
        })
        return false;
    }
    if (!userInfo.email || !validateEmail(userInfo.email)) {
        setErrorInfo({
            isError: true,
            errorFor: "email",
            errorMessage: "invalid email"
        });
        return false;
    }
    if (!userInfo.username || userInfo.username.trim(" ").length === 0) {
        setErrorInfo({
            isError: true,
            errorFor: "username",
            errorMessage: "Username is required"
        });
        return false;
    }
    if (!userInfo.password || userInfo.password.trim(" ").length < 8) {
        setErrorInfo({
            isError: true,
            errorFor: "password",
            errorMessage: "Password must be at least 8 character long"
        });
        return false;
    }
    return true;
}

// ###################### User Api calls
export const login = async (dispatch, user, setIsModal) => {
    dispatch(loginStart());
    dispatch(updateCartStart());
    try {
        const res = await publicRequest.post('/auth/login', user);

        // access token giving lots of error so setting it manually in storage

        localStorage.setItem("accessToken", res.data.accessToken);
        dispatch(loginSuccess(res.data));
        // pre fill cart from db
        // passing accessToken directly bcz updating state took some time
        const cartRes = await userRequest.get('/cart', {
            headers: { token: `Bearer: ${res.data.accessToken}` }
        });
        dispatch(updateCartSuccess(cartRes.data));
        setIsModal(false);
    } catch (error) {
        dispatch(loginFailure(error.response.data.errorInfo));
        dispatch(updateCartFailure());
    }
}

// update user profile
export const updateUser = async (dispatch, updateInfo, _id) => {
    dispatch(updateUserStart());
    try {
        const res = await userRequest.put(`/user/${_id}`, updateInfo);
        console.log(res.data);
        dispatch(updateUserSuccess(res.data));
    } catch (error) {
        dispatch(updateUserFailure());
        console.log(error);

    }
}

// register user
export const registerUser = async (userInfo, image, setIsModal, setErrorInfo) => {
    if (!validateForm(userInfo, setErrorInfo)) return;
    let formda = new FormData();
    if (userInfo.fullname)
        formda.append('fullname', userInfo.fullname.trim(" "));
    if (userInfo.password)
        formda.append('password', userInfo.password);
    if (userInfo.username)
        formda.append('username', userInfo.username.trim(" "));
    if (userInfo.email)
        formda.append('email', userInfo.email.trim(" "));
    if (userInfo.phone)
        formda.append('phone', userInfo.phone);
    if (userInfo.address)
        formda.append('address', userInfo.address.trim(" "));
    if (image)
        formda.append('imageFile', image);
    try {
        await publicRequest.post('/auth/register', formda);
        setIsModal(false);
    } catch (error) {
        const errorInfo = error.response.data.errorInfo;
        setErrorInfo(errorInfo);
    }
}


// ################################### Cart Api Calls
// add new product into database cart
export const addToCart = async (dispatch, productInfo) => {
    dispatch(updateCartStart());
    try {
        await userRequest.post('/cart', productInfo);
        dispatch(updateCartSuccess());
    } catch (error) {
        dispatch(updateCartFailure());
        console.log(error);
    }
};
export const removeFromCart = async (dispatch, productId) => {
    dispatch(updateCartStart());
    try {
        await userRequest.delete(`/cart/${productId}`);
        dispatch(updateCartSuccess());
    } catch (error) {
        dispatch(updateCartFailure());
        console.log(error);
    }
};


// update cart is left
// updateInfo = {type, quantity, ...product}
export const updateProductInCart = async (dispatch, productInfo) => {
    dispatch(updateCartStart());
    try {
        await userRequest.put(`/cart`, productInfo);
        dispatch(updateCartSuccess());
    } catch (error) {
        dispatch(updateCartFailure());
        console.log(error);
    }
};
