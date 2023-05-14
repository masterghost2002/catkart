import React from 'react';
import styled from 'styled-components';
const Form = styled.form`

`
const InputContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
`
const Label = styled.span`
    font-weight: 500;
    font-size:18px;
`

const Input = styled.input`
    border:none;
    width:100%;
    padding-top:10px;
    padding-bottom:10px;
    font-size:18px;
    border-bottom: ${props=>props.isError?'2px solid red':'2px solid lightgray'};
    &:focus{
        outline: none;
        border-bottom: 2px solid teal;
    }
`
const ErrrorText = styled.div`
    color:red;
    font-weight:500;
`
export default function Login({handleForm, errorInfo}) {
    return (
        <Form autocomplete="off">
            <InputContainer>
                <Label>Username or Email</Label>
                <Input placeholder='registered username or email' name="username_email" onChange={handleForm} isError = {errorInfo && errorInfo.errorFor === "username_email"} />
                {
                    errorInfo &&
                    errorInfo.errorFor === "username_email"  &&
                    <ErrrorText>{errorInfo.errorMessage}</ErrrorText>
                }
            </InputContainer>

            <InputContainer>
                <Label>Password</Label>
                <Input type="password" placeholder='********' name="password" onChange={handleForm} isError = {errorInfo && errorInfo.errorFor === "password"} />
                {
                    errorInfo &&
                    errorInfo.errorFor === "password"  &&
                    <ErrrorText>{errorInfo.errorMessage}</ErrrorText>
                }
            </InputContainer>
        </Form>
    )
}
