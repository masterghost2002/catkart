import styled from "styled-components";
import { mobile } from '../responsive';
import { Link } from "react-router-dom";
const Container = styled.div`
    position: relative;
    flex:1;
    margin: 3px;
    height: 70vh;

`
const Image = styled.img`
    width:100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height: "30vh" })};
   
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`
const Button = styled.button`
    border:none;
    padding: 10px;
    cursor:pointer;
    background-color:white;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;

`
export const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/${item.categorie}`}>
                <Image src={item.img} />
                <Info>
                    <Title>{item.title}</Title>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link>
        </Container>
    )
}
