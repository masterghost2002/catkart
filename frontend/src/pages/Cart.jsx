import React, { useEffect } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProductInCart } from '../store/apiCalls';
import { removeFromCart } from '../store/apiCalls';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { userRequest } from '../requestMethods';
import CatLoader from '../components/CatLoader';
import InfoContainer from '../components/CartComponents/InfoContainer';
import SummaryPay from '../components/CartComponents/SummaryPay';
import {updateCartStart, removeProduct, updateCartSuccess, updateProduct, updateCartFailure } from '../store/cartRedux';
const Container = styled.div`

`;
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "0px" })};
`;
const Title = styled.h1`
    padding: 0px;
    margin: 0px;
    font-weight: 400;
    text-align:center;
`;
const Top = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px;
    ${mobile({ flexWrap: "wrap", padding: "20px" })};
`;
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })};
`;
const StyledLink = styled(Link)`
    text-decoration:none;
    color:inherit;
    background-color:${props => props.type === 'filled' && '#D3D3D3'};
    padding:${props => props.type === 'filled' && '10px'};
    border-radius:${props => props.type === 'filled' && '6px'};
    font-size:${props => props.type === 'filled' && '18px'};
    font-weight:${props => props.type === 'filled' && '500'};
`
export const Cart = () => {
    
    const cart = useSelector((state) => state.cart);
    const user = useSelector(state => state.user.currentUser);
    const isFetching = (user && user.isFetching);
    const dispatch = useDispatch();

    /*
        removeitem from cart function does two thing
        1. it call the remove from cart api function which remove the product from cart in database
            dispatch function is given as parameter in removeFromCart (api call) to run the
            updateCartStart,success,failure function in cartReduc
        2. it remove the poduct from cartRedux

    */
    const removeItemFromCart = (product) => {
        if (user)
            removeFromCart(dispatch, product._id);
        dispatch(removeProduct(product));
    }
    /*
       handleCart  function does two thing
       1. it call the update cart api function which update the product quantity in database
           dispatch function is given as parameter in updateProduct (api call) to run the
           updateCartStart,success,failure function in cartReduc
       2. it update the poduct in cartRedux

   */
    const handleCart = (type, product) => {
        if (type === "dec" && product.quantity === 1) return;
        if (user) {
            updateProductInCart(dispatch, {
                _id: product._id,
                quantity: type === "inc" ? (product.quantity + 1) : (product.quantity - 1)
            });
        }
        // update in slice (local storage)
        dispatch(updateProduct({ _id: product._id, type }));
    }
    /* use effect use case
        suppose the user logged the id in two devices and add the product in 
        cart from device a but he/she want to make the payment from 
        device b show if we didn't implement this use effect then the user
        have to relogin to update the cart so, to prevent this we
        implemented the use effect function so, on refresh or on coming to
        cart section it auto get updated
    */
    useEffect(() => {
        
        const keepCartUpdate = async () => {
            if(!user) return;
            dispatch(updateCartStart());
            try {
                const res = await userRequest.get('/cart');
                dispatch(updateCartSuccess(res.data));
            } catch (error) {
                dispatch(updateCartFailure());
                console.log(error);
            }
        }
        keepCartUpdate();
    }, [dispatch, user]);

    return (
        <Container >
            <Wrapper>
                <Title>Your Cart</Title>
                <Top>
                    <StyledLink type='filled' to='/'>Continue Shopping</StyledLink>
                    <StyledLink to='/cart'><FavoriteBorderIcon style={{ fontSize: '30px' }} /></StyledLink>
                </Top>
                <Bottom>
                    {
                        (isFetching!==null && isFetching === true)? <CatLoader text={"Kitty is loading your cart..."}/> :
                        <>
                            <InfoContainer products={cart.products} handleCart = {handleCart} removeItemFromCart={removeItemFromCart}/>
                            <SummaryPay total={cart.total}/>
                        </>
                    }

                    
                </Bottom>
            </Wrapper>
        </Container>
    )
}
