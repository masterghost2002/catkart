import styled from "styled-components";
import {Button} from '../components/User/CardComponents';
import { motion } from "framer-motion";
import { useState } from "react";
import { multiPartRequest } from "../requestMethods";
const Container = styled(motion.div)`
    flex:5;
    padding: 20px;
`
const Title = styled.h2`
    padding: 0px;
    margin: 0px;
`
const Form = styled.form`
    // background-color:red;
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

export default function NewUser() {
    const [userDetails, setUserDetails] = useState({});
    const [file, setFile] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const handleOnChange = (e)=>{
        e.preventDefault();
        setUserDetails(prevState=>{
            return {
                ...prevState, [e.target.name]:e.target.value
            }
        });
    }
    const handleAddUser = async (e)=>{
        e.preventDefault();
        setIsAdding(true);
        var formda = new FormData();
        formda.append('username', userDetails.username);
        formda.append('fullname', userDetails.fullname);
        formda.append('email', userDetails.email);
        formda.append('password', userDetails.passowrd);
        formda.append('phone', userDetails.phone);
        formda.append('address', userDetails.address);
        formda.append('imageFile', file);
        try {
            const res = await multiPartRequest.post('/auth/register', formda);
            console.log(res.status);
        } catch (error) {
            console.log(error);
        }
        setIsAdding(false);


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
            <Title>Add User</Title>
            <Form>
                <InputGroup>
                    <Label>Full Name</Label>
                    <Input type="text" placeholder="Paul Walker" name='fullname' onChange={handleOnChange}/>
                </InputGroup>
                <InputGroup>
                    <Label>Username</Label>
                    <Input type="text" placeholder="paulwalker111" name='username' onChange={handleOnChange}/>
                </InputGroup>
                <InputGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="paulwalker111@mail.com" name='email' onChange={handleOnChange}/>
                </InputGroup>
                <InputGroup>
                    <Label>Password</Label>
                    <Input type="password" placeholder="*********" name='password'  onChange={handleOnChange}/>
                </InputGroup>
                <InputGroup>
                    <Label>Phone</Label>
                    <Input type="text" placeholder="+1 123 456 7890" name='phone' onChange={handleOnChange} />
                </InputGroup>
                <InputGroup>
                    <Label>Address</Label>
                    <textarea type="text" placeholder="Delhi, India" name="address"  onChange={handleOnChange}/>
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="file" style={{cursor:'pointer'}}>Upload Profile Picture</Label>
                    <Input type="file" style={{border:'none'}} id="file" name='imageFile' onChange={(e)=>setFile(e.target.files[0])}></Input>
                </InputGroup>
                {!isAdding && <Button type="submit" mt='20px' w='100px'  bg='#009fff' hbg='#007fff' onClick={handleAddUser}>Submit</Button>}
            </Form>
        </Container>
    )
}
