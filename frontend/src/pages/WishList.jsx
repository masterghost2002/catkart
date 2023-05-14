import React, { useEffect } from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userRequest } from '../requestMethods';
import { useDispatch } from 'react-redux';
import { removeFromWishList, updateWishList } from '../store/userSlice';
import { useSelector } from 'react-redux';
import CatLoader from '../components/CatLoader';
const Container = styled.div`
    
`
const Heading = styled.div`
    font-size:28px;
    font-weight:500;
    padding:20px;
`
const ListContainer = styled.ul`
    list-style:none;
    padding:20px 100px 20px 100px;
    ${mobile({ padding: "0px" })}
`
const ListItem = styled.li`
    display:flex;
    align-items:center;
    margin-bottom:20px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
const ProductContainer = styled.div`
    width:100%;
    position:relative;
`
const Image = styled.img`
    flex:1;
    height:200px;
    object-fit:fit;
    ${mobile({ width: "35%", height: 'auto', flex: '3' })};
`
const InfoContainer = styled.div`
    display:flex;
    flex:9;
    flex-direction:column;
    margin-left:50px;
    ${mobile({ marginLeft: '10px', flex: '7' })};
`
const ProductName = styled.span`
    font-weight:500;
    font-size:28px;
    ${mobile({ fontSize: '24px' })};
`
const ProductDesc = styled.p`
    max-height:50px;
    overflow:hidden;
`
const ProductPrice = styled.div`
    font-size:20px;
    font-weight: 600;
    margin-bottom:20px;
`
const StyledLink = styled(Link)`
    text-decoration:none;
    color:inherit;
    padding:20px;
    display:flex;
    align-items:center;
    justify-content:center;
`
const IconButton = styled.button`
    position:absolute;
    right:10px;
    top:10px;
    background:transparent;
    border:none;
    cursor:pointer;
`
const ContinueButton = styled.button`
    padding:10px;
    font-size:18px;
    font-weight:500;

`
const EmptyWishListContainer = styled.div`
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`
const EmptyText = styled.span`
    font-size:24px;
    font-weight:500;
`
export default function WishList() {
    const wishlist = useSelector(state => state.user.currentUser.wishlist);
    const isFetching = useSelector(state => state.user.currentUser.isFetching);
    const dispatch = useDispatch();

    // remove from db and userSlice
    const removeItemFromWishList = async (productId) => {
        try {
            // delete from db
            await userRequest.delete(`/user/wishlist/${productId}`);
            // delete from slice
            dispatch(removeFromWishList({ _id: productId }));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await userRequest.get('/products/wishlist');
                // const wishlistId = res.data.map(ele=>ele._id);
                dispatch(updateWishList(res.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchWishlist();
    }, [dispatch]);
    return (
        <Container>
            <Heading>My Wishlist</Heading>
            {
                isFetching ?
                    <CatLoader text={"Kitty is fetching your wishlist..."} /> :
                    <ListContainer>
                        {
                            (!wishlist || wishlist.length === 0) ?
                                <EmptyWishListContainer>
                                    <EmptyText>
                                        Your Wishlist is empty
                                        <StyledLink to='/'>
                                            <ContinueButton>
                                                Continue Shopping
                                            </ContinueButton>
                                        </StyledLink>
                                    </EmptyText>
                                </EmptyWishListContainer>
                                : wishlist.map((product, index) =>
                                    <ListItem key={index}>
                                        <ProductContainer>
                                            <StyledLink to={`/product/${product._id}`} state={product}>
                                                <Image src={product.image} />
                                                <InfoContainer>
                                                    <ProductName>
                                                        {product.title}
                                                    </ProductName>
                                                    <ProductDesc>{product.desc}</ProductDesc>
                                                    <ProductPrice> {`₹ ${product.price}`}</ProductPrice>
                                                </InfoContainer>
                                            </StyledLink>
                                            <IconButton onClick={() => removeItemFromWishList(product._id)}>
                                                <DeleteOutlineIcon></DeleteOutlineIcon>
                                            </IconButton>
                                        </ProductContainer>
                                    </ListItem>
                                )

                        }

                    </ListContainer>}
        </Container>
    )
}
<EmptyWishListContainer>
    <EmptyText>
        Your cart is empty
    </EmptyText>
</EmptyWishListContainer>