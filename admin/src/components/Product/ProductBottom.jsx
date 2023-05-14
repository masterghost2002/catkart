import styled from "styled-components";
import { CardHeader, CardBody, Button,Title, Input,AvatarImage, Detail} from "../User/CardComponents";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
const Container = styled.div`
  padding:20px;
`
const SubContainer = styled.div`
    flex:1;
    display:flex;
    flex-direction: ${props => props.direction ? props.direction : 'column'};
    justify-content: ${props => props.js ? props.js : 'flex-start'};
    align-items: ${props => props.ai !== null && props.ai};
    // background-color:red;
`
export default function ProductBottom({data}) {
  const [productInfo, setProductInfo] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleOnChange = (e)=>{
    setProductInfo(prevState=> {
      return {
        ...prevState, [e.target.name]:e.target.value
      }
    });
  }
  const handleUpdate = (e)=>{
    e.preventDefault();
    var formda = new FormData();
    if(productInfo.title)
      formda.append("title", productInfo.title);
    if(productInfo.desc)
      formda.append("desc", productInfo.desc);
    if(productInfo.price)
      formda.append("price", productInfo.price);
    if(file)
      formda.append("imageFile", file);
    updateProduct(data._id,formda, dispatch);
  }
  return (
    <Container>
      <CardHeader>
        <Title>
          Edit Product
        </Title>
      </CardHeader>
      <form >
        <CardBody direction='row'>
          <SubContainer direction='column'>
            <Detail mt='20px' fw='500' >Product Name</Detail>
            <Input  onChange={handleOnChange} placeholder={data.title} name="title" />
            <Detail mt='20px' fw='500' >Details</Detail>
            <textarea onChange={handleOnChange} placeholder={data.desc} name="desc"/>
            <Detail mt='20px' fw='500' >Price</Detail>
            <Input onChange={handleOnChange} placeholder={data.price} name="price"/>
            <Detail mt='20px' fw='500' name="inStock">In Stock</Detail>
            <select name="inStock" defaultValue={data.inStock} onChange={handleOnChange}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </SubContainer>
          <SubContainer direction='column' ai='center' js='space-between'>
            <SubContainer direction='column'>
              <AvatarImage
                src={data.image}
                height='150px'
                br='6px'
              />
              <label htmlFor="file" style={{ marginTop: '10px', cursor: 'pointer' }} title={'Upload Image'}><FileUploadIcon /></label>
              <Input onChange={(e)=>setFile(e.target.files[0])} type="file" style={{ display: 'none' }} id="file" name="image" />
            </SubContainer>
            <Button w='100px' bg='#66bb6a' hbg='#388e3c' type="submit" onClick={handleUpdate}>Update</Button>
          </SubContainer>
        </CardBody>
      </form>
    </Container>
  )
}
