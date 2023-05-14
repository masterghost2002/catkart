import styled from "styled-components";
import SendIcon from '@mui/icons-material/Send';
import {mobile} from '../responsive';
const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ${mobile({height:"40vh"})};
`
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
    ${mobile({fontSize:"50px", marginBottom:'10px'})};
`
const Description = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin-bottom: 20px;
    color: gray;
`
const InputContainer = styled.div`
    width: 50%;
    height:40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    border: 1px solid lightgray;
    ${mobile({width:"80%"})};

`
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
    &:focus{
        outline: none;
    }
`
const Button = styled.button`
    border-radius: 6px;
    flex: 1;
    border: none;
    background-color: white;
    color: black;
`

export const Newsletter = () => {
  return (
    <Container>
        <Title>
            Newsletter
        </Title>
        <Description>
            Get timely update of your fav Products
        </Description>
        <InputContainer>
            <Input placeholder="Your Email address"/>
            <Button>
            <SendIcon/>
            </Button>
        </InputContainer>
        
    </Container>
  )
}
