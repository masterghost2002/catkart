import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../../responsive';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
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
export default function InfoContainer({products, handleCart, removeItemFromCart}) {
    return (
        <Info>
            {products.map((product, index) =>
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
                            <AddIcon onClick={() => handleCart("inc", product)} style={{cursor:"pointer"}}/>
                            <ProductAmount>{product.quantity}</ProductAmount>
                            <RemoveIcon onClick={() => handleCart("dec", product)} style={{cursor:"pointer"}}/>
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
                products.length === 0 &&
                <EmptyCartContainer>
                    <EmptyText>
                        Your cart is empty
                    </EmptyText>
                </EmptyCartContainer>
            }
        </Info>
    )
}
