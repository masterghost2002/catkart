import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../responsive';
import { useLocation, Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { addProduct } from "../store/cartRedux";
import { addToCart } from "../store/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CatLoader from "../components/CatLoader";
const Container = styled.div`
  margin-bottom:20px;
  margin-top:20px;
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "0px" })}
`;
const ImgContainer = styled.div`
  flex:1;
`;
const Image = styled.img`
  width:100%;
  height: 70vh;
  object-fit: fll;
  ${mobile({height:'40vh', objectFit:'fill' })};
`;
const InfoContainer = styled.div`
  flex:1;
  padding: 0px 50px;
  ${mobile({ padding: "0px 20px" })}
`;
const Title = styled.h1`
  font-weight: 200;
  padding: 0;
  margin: 0;
`;
const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`
const Filter = styled.div`
  display: flex;
  align-items: center;
`
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 300;
`
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin:0px 5px;
  cursor: pointer;
`
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;

`
const FilterSizeOption = styled.option`
`

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
`
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 400;
  &:hover{
    background-color: #f8f4f4;
  }
`
const LinkButton = styled(Link)`
  padding: 15px;
  border: none;
  text-decoration:none;
  background-color: teal;
  color:white;
  cursor: pointer;
  font-weight: 500;
`
export const SingleProduct = () => {
  const user = useSelector(state => state.user.currentUser);
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const products = useSelector(state => state.cart.products);
  const [product, setProduct] = useState(location.state);
  const [quantity, setQuantity] = useState(1);
  const [isFetching, setIsFetching] = useState(product === null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();
  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1)
      setQuantity(prevState => prevState - 1);
    if (type === "inc")
      setQuantity(prevState => prevState + 1);
  }
  const handleCart = () => {
    // adding item to db
    if (user) {
      const productInfo = {
        _id: product._id,
        quantity,
        color: color ? color : product.color[0],
        size: size ? size : product.size[0]
      }
      addToCart(dispatch, productInfo);
    }
    // adding same item to redux
    const productInfo = {
      ...product,
      price: Number(product.price),
      quantity,
      color: color ? color : product.color[0],
      size: size ? size : product.size[0]
    }
    dispatch(addProduct(productInfo))

  }
  useEffect(() => {
    // function to check if the product is in cart then set the button to go to cart
    const checkProductInCart = () => {
      const index = products.findIndex(product => product._id === id);
      if (index !== -1) setInCart(true);
    }
    checkProductInCart();
  }, [products, id]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/` + id);
        setProduct(res.data);

        // switching off the isFetching
        setIsFetching(false);
      } catch (error) {
        console.log(error);
      }
    }


    getProduct();
  }, [id]);
  return (
    <Container>
      <Wrapper>
        {isFetching ? 
          <CatLoader/>
        :
          <>
            <ImgContainer>
              <Image src={product.image} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Description>{product.desc}</Description>
              <Price>{(product.price).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR'
              })}</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  {
                    product.color.map((col, index) =>
                      <FilterColor color={col} key={index} onClick={() => setColor(col)} />
                    )
                  }
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize>
                    {
                      product.size.map((s, index) =>
                        <FilterSizeOption key={index} onClick={() => setSize(s)}>{s}</FilterSizeOption>
                      )
                    }
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <RemoveIcon onClick={() => handleQuantity("dec")} />
                  <Amount>{quantity}</Amount>
                  <AddIcon onClick={() => handleQuantity("inc")} />
                </AmountContainer>
                {
                  inCart ?
                    <LinkButton to='/cart'>Go to Cart</LinkButton>
                    : <Button onClick={handleCart}>Add to cart</Button>
                }
              </AddContainer>
            </InfoContainer>
          </>}
      </Wrapper>
    </Container >
  )
}
