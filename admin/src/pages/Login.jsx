import styled from "styled-components";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from "../redux/apiCalls";
const Container = styled.div`
    display:flex;
    align-items:center;
    width:100vw;
    height:100vh;
    justify-content:center;
`
const FormContainer = styled.div`
    padding: 20px;
    border: 2px solid gray;
    border-radius: 6px;
`
const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
`
const Input = styled.input`
    padding: 10px;
    margin-top: 10px;
    margin-bottom:10px;
    font-size:16px;
`
const Heading = styled.h2`
    padding:0px;
    margin:0px;
    
`
const Button = styled.button`
    width:100%;
    padding:10px;
    font-size: 16px;
    background-color:#008080;
    color:white;
    cursor:pointer;
`
export default function Login() {
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const handleOnChange = (e)=>{
        e.preventDefault();
        setInputs((prevState)=>{
            return {
                ...prevState, [e.target.name]:e.target.value,
            }
        });
    };
    const handleLogin = (e)=>{
        e.preventDefault();
        login(dispatch, inputs, naviagte);
    } 
    return (
        <Container>
            <FormContainer>
                <Heading>Admin Login</Heading>
                <InputContainer>
                    <Input placeholder="username" type="text" name = "username" onChange = {handleOnChange}/>
                    <Input placeholder="********" type="password" name = "password" onChange =  {handleOnChange}/>
                </InputContainer>
                <Button onClick={handleLogin}>Log-In</Button>
            </FormContainer>
        </Container>
    )
}
