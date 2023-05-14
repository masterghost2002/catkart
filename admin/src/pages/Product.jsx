import styled from "styled-components";
import ProductTop from "../components/Product/ProductTop";
import ProductBottom from "../components/Product/ProductBottom";
import { Button } from "../components/User/CardComponents";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Container = styled(motion.div)`
    flex:5;
    padding:20px;
`
const Header = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const Title = styled.h2`
    padding: 0px;
    margin: 0px;

`
export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];

    const product = useSelector(state=>state.product.products.find(product=>product._id === productId));
  return (
    <Container
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        }}
    >
        <Header>
            <Title>Product</Title>
            <Link to='/product/newproduct'>
                <Button bg='#009fff' hbg='#007fff'>Add Product</Button>
            </Link>
        </Header>
        <ProductTop data = {product}/>
        <ProductBottom data = {product}/>
    </Container>
  )
}
