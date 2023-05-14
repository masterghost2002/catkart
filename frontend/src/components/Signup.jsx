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
    font-weight: bold;
`

const Input = styled.input`
    border:none;
    width:100%;
    height: 30px;
    border-bottom: ${props=>props.isError?'2px solid red':'2px solid lightgray'};
    &:focus{
        outline: none;
        border-bottom: 2px solid teal;
    }
`
const Required = styled.span`
    color:red;
`
const TextArea = styled.textarea`
    &:focus{
      outline:0;
    }
`
const ErrrorText = styled.div`
    color:red;
    font-weight:500;
`
export default function Signup({handleForm, setImage, errorInfo}) {
    // console.log(errorInfo);
    
  return (
    <Form autocomplete="off">
            <InputContainer>
                <Label>Full Name<Required>*</Required></Label>
                <Input placeholder='Full Name' name="fullname" onChange={handleForm} required={true} isError = {errorInfo.errorFor === "fullname"}/>
                {
                    errorInfo.isError && 
                    errorInfo.errorFor === "fullname"  &&
                    <ErrrorText>{errorInfo.errorMessage}</ErrrorText>
                }
            </InputContainer>
            <InputContainer>
                <Label>Email<Required>*</Required></Label>
                <Input placeholder='Your email address' name="email" onChange={handleForm} required={true}/>
                {
                    errorInfo.isError && 
                    errorInfo.errorFor === "email"  &&
                    <ErrrorText>{errorInfo.errorMessage}</ErrrorText>
                }
            </InputContainer>
            <InputContainer>
                <Label>Username<Required>*</Required></Label>
                <Input placeholder='username (unique)' name="username" onChange={handleForm} required={true} />
                {
                    errorInfo.isError && 
                    errorInfo.errorFor === "username"  &&
                    <ErrrorText>{errorInfo.errorMessage}</ErrrorText>
                }
            </InputContainer>
            <InputContainer>
                <Label>Profile Image</Label>
                <Input type="file" name='imageFile' placeholder='No image selected' onChange={(e)=>setImage(e.target.files[0])} />
            </InputContainer>
            <InputContainer>
                <Label>Phone</Label>
                <Input placeholder='+91 123-456-8901' name="phone" onChange={handleForm} required={true}/>
            </InputContainer>
            <InputContainer>
                <Label>Address</Label>
                <TextArea placeholder='Address (for delivery)' name="address" onChange={handleForm} required={true}/>
            </InputContainer>

            <InputContainer>
                <Label>Password</Label>
                <Input type="password" placeholder='********' name="password" onChange={handleForm} />
                {
                    errorInfo.isError && 
                    errorInfo.errorFor === "password"  &&
                    <ErrrorText>{errorInfo.errorMessage}</ErrrorText>
                }
            </InputContainer>
        </Form>
  )
}
