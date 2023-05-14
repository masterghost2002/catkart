import React, { useEffect } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import Pay from '../components/Payment/Pay';
import { Link } from 'react-router-dom';
import { updateProductInCart } from '../store/apiCalls';
import { removeProduct, updateCartSuccess, updateProduct, updateCartFailure } from '../store/cartRedux';
import { removeFromCart } from '../store/apiCalls';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { userRequest } from '../requestMethods';
import CatLoader from '../components/CatLoader';
import { updateUserStart } from '../store/userSlice';
import InfoContainer from '../components/CartComponents/InfoContainer';
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
const Info = styled.div`
    flex: 3;
    margin-right:10px;
    ${mobile({ marginRight: '0px' })};
`;
const Product = styled.div`
    display: flex;
    position:relative;
    border-radius:6px;
    justify-content: space-between;
    padding:20px 10px;
    margin-top:10px;
    margin-bottom:10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    ${mobile({ flexDirection: "column", borderRadius: '0px' })};
`
const ProductDetail = styled.div`
    flex:2;
    display: flex;
`
const Image = styled.img`
    width:200px;
    ${mobile({ width: "25%" })}
`
const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`
const ProductName = styled.span`
`

const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props => props.color};
    border:${props => props.color === 'white' && '2px solid black'};
`
const ProductSize = styled.span`
`
const PriceDetails = styled.span`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    ${mobile({ marginTop: "10px" })};
`
const ProductAmountContainer = styled.div`
    display:flex;
    align-items:center;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin:5px;
`
const ProductPrice = styled.div`
    font-size:20px;
    font-weight: 400;
    margin-bottom:20px;
`
const Summary = styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius: 10px;
    padding:20px;
    height:60vh;
    ${mobile({ marginTop: "10px", borderRadius: '0px', marginBottom: '20px' })};
`
const SummaryTitle = styled.h1`
    font-weight:200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display:flex;
    justify-content:space-between;
    
`
const SummaryItemText = styled.span`
    font-weight: ${props => props.type === "total" && '500'};
    font-size: ${props => props.type === "total" && '24px'};
    
`
const SummaryItemPrice = styled.span`
    
`
const Removebutton = styled.button`
    position:absolute;
    right:10px;
    top:10px;
    background:transparent;
    border:none;
    cursor:pointer;
`
const StyledLink = styled(Link)`
    text-decoration:none;
    color:inherit;
    background-color:${props => props.type === 'filled' && '#D3D3D3'};
    padding:${props => props.type === 'filled' && '10px'};
    border-radius:${props => props.type === 'filled' && '6px'};
    font-size:${props => props.type === 'filled' && '18px'};
    font-weight:${props => props.type === 'filled' && '500'};
`
const EmptyCartContainer = styled.div`
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`
const EmptyText = styled.span`
    font-size:24px;
    font-weight:500;
`
export const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector(state => state.user.currentUser);
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
        dispatch(updateProduct({ _id: product._id, type }));
    }
    console.log(cart)
    /*
        suppose the user logged the id in two devices and add the product in 
        cart from device a but he/she want to make the payment from 
        device b show if we didn't implement this use effect then the user
        have to relogin to update the cart so, to prevent this we
        implemented the use effect function so, on refresh or on coming to
        cart section it auto get updated
    */
    useEffect(() => {
        const keepCartUpdate = async () => {
            dispatch(updateUserStart());
            try {
                const res = await userRequest.get('/cart');
                dispatch(updateCartSuccess(res.data));
            } catch (error) {
                dispatch(updateCartFailure());
                console.log(error);
            }
        }
        keepCartUpdate();
    }, [dispatch]);
    return (
        <Container>
            <Wrapper>
                <Title>Your Cart</Title>
                <Top>
                    <StyledLink type='filled' to='/'>Continue Shopping</StyledLink>
                    <StyledLink to='/cart'><FavoriteBorderIcon style={{ fontSize: '30px' }} /></StyledLink>
                </Top>
                <Bottom>
                    {
                        true ? <CatLoader type={'https://cdn.dribbble.com/users/2479507/screenshots/8678351/media/d336cea07ca3557d6bf17376eb7b68af.gif'}/> :
                            <Info>
                                {cart.products.map((product, index) =>
                                    <Product key={index}>
                                        <StyledLink to={`/product/${product._id}`}>
                                            <ProductDetail>
                                                <Image src={product.image} />
                                                <Details>
                                                    <ProductName><b>Prodcut: </b>{product.title}</ProductName>
                                                    {/* <ProductId><b>Id:</b>{product._id}</ProductId> */}
                                                    <ProductColor color={product.color} />
                                                    <ProductSize><b>Size:</b>{product.size}</ProductSize>
                                                </Details>
                                            </ProductDetail>
                                        </StyledLink>
                                        <PriceDetails>
                                            <ProductAmountContainer>
                                                <AddIcon onClick={() => handleCart("inc", product)} />
                                                <ProductAmount>{product.quantity}</ProductAmount>
                                                <RemoveIcon onClick={() => handleCart("dec", product)} />
                                            </ProductAmountContainer>
                                            <ProductPrice>{((product.price * product.quantity)).toLocaleString('en-IN', {
                                                style: 'currency',
                                                currency: 'INR'
                                            })}</ProductPrice>
                                        </PriceDetails>
                                        <Removebutton title='remove-item' onClick={() => removeItemFromCart(product)}><ClearIcon /></Removebutton>
                                    </Product>
                                )}
                                {
                                    cart.products.length === 0 &&
                                    <EmptyCartContainer>
                                        <EmptyText>
                                            Your cart is empty
                                        </EmptyText>
                                    </EmptyCartContainer>
                                }
                            </Info>
                    }

                    <Summary>
                        <SummaryTitle>Order Summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>
                                Subtotal
                            </SummaryItemText>
                            <SummaryItemPrice>
                                {(cart.total).toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR'
                                })}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                Estimated Shipping
                            </SummaryItemText>
                            <SummaryItemPrice>
                                70
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                Shipping Discount
                            </SummaryItemText>
                            <SummaryItemPrice>
                                -70
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText type="total">
                                Total
                            </SummaryItemText>
                            <SummaryItemPrice>
                                {(cart.total).toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR'
                                })}
                            </SummaryItemPrice>
                        </SummaryItem>
                        {cart.total > 0 && <Pay />}
                    </Summary>
                </Bottom>
            </Wrapper>
        </Container>
    )
}
