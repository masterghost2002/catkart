import styled from "styled-components";
import {Button} from '../components/User/CardComponents';
import { motion } from "framer-motion";
import { useState } from "react";
import { addProduct } from "../redux/apiCalls";
import {useDispatch, useSelector} from 'react-redux';
const Container = styled(motion.div)`
    flex:5;
    padding: 20px;
`
const Title = styled.h2`
    padding: 0px;
    margin: 0px;
`
const Form = styled.form`
    display:flex;
    flex-wrap:wrap; 
    justify-content:space-between;
`
const InputGroup = styled.div`
    margin-top:20px;
    margin-right:20px;
    display:flex;
    flex-direction:column;
    width:500px;
`
const Label = styled.label`
    font-size:20px;
    margin-bottom:10px;
    font-weight:500;
    color:#303030;
`
const Input = styled.input`
    border:none;
    border-bottom: 2px solid #A9A9A9;
    height:20px;
    padding:10px 0px;
    font-size:20px;
    &:focus{
        outline:none;
        border-bottom: 2px solid #696969;
    }
`

export default function NewProduct() {
    const dispatch = useDispatch();
    const isFetching = useSelector(state=>state.product.isFetching);
    const [productInfo, setProductInfo] = useState({});
    const [file, setFile] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [categories, setCategoreis] = useState([]);
    const [colors, setColors] = useState([]);
    const handleAddProduct = async (e)=>{
        e.preventDefault();
        var formda = new FormData();
        formda.append("title", productInfo.title);
        formda.append("desc", productInfo.desc);
        formda.append("price", productInfo.price);
        formda.append("size",  JSON.stringify(sizes));
        formda.append("categories",  JSON.stringify(categories));
        formda.append("color", JSON.stringify(colors));
        formda.append("imageFile", file);

        await addProduct(formda, dispatch);
    }
    const handleChange = (e)=>{
        e.preventDefault();
        setProductInfo(prevState=>{
            return {
                ...prevState, [e.target.name]:e.target.value
            }
        });
    }
    const handleSize = (e)=>{
        e.preventDefault();
        setSizes(()=>[...sizes, e.target.value]);
    }
    const handleColors = (e)=>{
        e.preventDefault();
        setColors(()=>[...colors, e.target.value]);
    }
    const handleCategories = (e)=>{
        e.preventDefault();
        setCategoreis(()=>[...categories, e.target.value]);
    }
    const handleFile = (e)=>{
        e.preventDefault();
        setFile(e.target.files[0])
    }
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
            <Title>Add Product</Title>
            <Form enctype="multipart/form-data" method="POST">
                <InputGroup>
                    <Label>Product Name</Label>
                    <Input type="text" placeholder="Jara Jeans" name="title" onChange={handleChange} />
                </InputGroup>
                <InputGroup>
                    <Label>Description</Label>
                    <textarea type="text" placeholder="Full HD flicker-free"  name="desc" onChange={handleChange}/>
                </InputGroup>
                <InputGroup>
                    <Label>Price</Label>
                    <Input type="text" placeholder="1" name="price" onChange={handleChange} />
                </InputGroup>
                <InputGroup>
                    <Label>Size</Label>
                    <select name="size" onChange={handleSize}>
                        <option value="XXS">XXS</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="MD">MD</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </InputGroup>
                <InputGroup>
                    <Label>Color</Label>
                    <select name="color"  onChange={handleColors}>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="pink">Pink</option>
                        <option value="yellow">Yellow</option>
                    </select>
                </InputGroup>
                <InputGroup>
                    <Label>Categoreis</Label>
                    <select name="categories"  onChange={handleCategories}>
                        <option value="Winter">Winter</option>
                        <option value="summer">Red</option>
                        <option value="shirt">Shirt</option>
                        <option value="tshirt">Tshirt</option>
                        <option value="jeans">Jeans</option>
                        <option value="pajama">Pajama</option>
                        <option value="jacket">Jacket</option>
                        <option value="bag">Bag</option>
                        <option value="top">Tops</option>
                    </select>
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="file" style={{cursor:'pointer'}}>Upload Picture</Label>
                    <Input type="file" style={{border:'none'}} id="file" name="imageFile" onChange={handleFile}></Input>
                </InputGroup>
                <Button disabled={isFetching} type="submit" mt='20px' w='100px'  bg='#009fff' hbg='#007fff' onClick={handleAddProduct} >Submit</Button>
            </Form>
        </Container>
    )
}
