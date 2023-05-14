import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { mobile } from '../responsive';
import { useDispatch } from 'react-redux';
import {updateUser} from '../store/apiCalls';
const Container = styled.div`
    padding:${props => props.padding};
    display:${props => props.display};
    flex-direction:${props => props.direction};
    flex:${props => props.flex};
    align-items:${props => props.align};
    margin-top: ${props => props.mt};
    margin-left: ${props => props.ml};
    margin-bottom: ${props => props.mb};
    margin-right: ${props => props.mr};
    background-color:${props => props.bg};
    box-shadow: ${props => props.shadow};
    border-radius:${props => props.br};
    flex-wrap:${props => props.fw};
    ${props => props.mobile};
`
const Heading = styled.h1`
    padding:0px;
    margin:0px;
`
const Image = styled.img`
    height:${props => props.size};
    border-radius:100%;
    width:${props=>props.size}
`
const Text = styled.div`
    font-size:${props => props.fs};
    font-weight:${props => props.fw};
    color:${props => props.color};
    margin-top: ${props => props.mt};
    margin-left: ${props => props.ml};
    margin-bottom: ${props => props.mb};
    margin-right: ${props => props.mr};
   
`
const From = styled.form`

`
const InputGroup = styled.div`
    display:flex;
    flex-direction:${props => props.direction ? props.direction : 'column'};
    align-items:${props => props.align};
    margin-top: ${props => props.mt};
    margin-left: ${props => props.ml};
    margin-bottom: ${props => props.mb};
    margin-right: ${props => props.mr};
`
const InputLabel = styled.label`
    margin-top: ${props => props.mt};
    margin-left: ${props => props.ml};
    margin-bottom: ${props => props.mb};
    margin-right: ${props => props.mr};
    font-size:${props => props.fs};
    font-weight:${props => props.fw};
    color:${props => props.color};
`
const Input = styled.input`
    margin-top: ${props => props.mt};
    margin-left: ${props => props.ml};
    margin-bottom: ${props => props.mb};
    margin-right: ${props => props.mr};
    width:70%;
    ${props => props.mobile};
    padding:10px;
`
const Button = styled.button`
    border:none;
    padding:10px;
    font-size:20px;
    background-color:teal;
    color:white;
    border-radius:6px;
    cursor:pointer;
`
export default function Profile() {
    const user = useSelector(state => state.user.currentUser);
    const error = useSelector(state=>state.user.error);
    const fetching = useSelector(state=>state.user.isFetching);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({_id:user._id});
    const [file, setFile] = useState(null);
    const handleChange = (e)=>{
        setUserInfo(prevState=>{
            return {
                ...prevState, [e.target.name]:e.target.value
            }
        });
    }
    const handleUpdate = (e)=>{
        e.preventDefault();
        let formda = new FormData();
        if(userInfo.fullname)
            formda.append('fullname', userInfo.fullname);
        if(userInfo.email)
            formda.append('email', userInfo.email);
        if(userInfo.phone)
            formda.append('phone', userInfo.phone);
        if(userInfo.address)
            formda.append('address', userInfo.address);
        if(file)
            formda.append('imageFile', file);
        updateUser(dispatch, formda, userInfo._id);
    }
    return (
        <Container
            padding='20px'
            mobile={mobile({ padding: '10px' })}
        >
            <Heading>Profile Settings</Heading>
            <Container
                display={"flex"}
                direction={'row'}
                padding={'20px'}
                mobile={mobile({padding:'10px'})}
                fw='wrap'
            >
                {/* left container */}
                <Container
                    display='flex'
                    flex='2'
                    direction='column'
                    // bg='#F7FAFC'
                    padding='30px'
                    shadow='rgba(0, 0, 0, 0.18) 0px 2px 4px;'
                    br='12px'
                >
                    {/* image and email container */}
                    <Container
                        display='flex'
                        direction='column'
                        align='center'
                        fw='wrap'
                    >
                        <Container mb='10px'>
                            <Image size='150px' src={user.image} />
                        </Container>
                        <Text mb='10px' fs='30px' fw='600'>{user.fullname}</Text>
                        <Container mb='10px' display='flex' align='center'>
                            <Text fs='20px' fw='400'>Username:</Text>
                            <Text fs='20px' fw='500' ml='10px' >{user.username}</Text>
                        </Container>
                        <Container mb='10px' display='flex' align='center'>
                            <Text fs='20px' fw='400'>Email:</Text>
                            <Text fs='20px' fw='500' ml='10px' >{user.email}</Text>
                        </Container>
                    </Container>
                    <Container mb='10px' display='flex' align='center'>
                        <Text fs='30px' mr='10px' >Address</Text>
                        <PlaceIcon />
                    </Container>
                    <Text mb='10px' fs='30px' mr='10px' fw='500' color='#718096'>{user.address}</Text>
                    <Container mb='10px' display='flex' align='center'>
                        <Text fs='30px' mr='10px'>Phone</Text>
                        <LocalPhoneIcon />
                    </Container>
                    <Text fs='30px' mr='10px' fw='500' color='#718096'>{user.phone}</Text>
                </Container>

                {/* right container */}
                <Container
                    flex='3'
                    padding='20px'
                    ml='50px'
                    display='flex'
                    direction='column'
                    mobile={mobile({ padding: '10px', marginLeft: '0px', marginTop: '20px' })}
                >
                    <Heading>Edit</Heading>
                    <From>
                        <Container display='flex' align='center' mb='20px' mt='20px'>
                            <Image src={user.image} size='80px' />
                            <InputGroup ml='20px'>
                                <InputLabel fs='20px' mb='10px' fw='500'>Upload Profile</InputLabel>
                                <Input type="file" name='imageFile' placeholder='No image selected' onChange={(e)=>setFile(e.target.files[0])} />
                            </InputGroup>
                        </Container>
                        <InputGroup mb='20px' mt='20px' >
                            <InputLabel fs='20px' mb='10px' fw='500'>Full Name</InputLabel>
                            <Input placeholder={user.fullname} name='fullname'  onChange={handleChange} mobile={mobile({ width: '100%' })} />
                        </InputGroup>
                        <InputGroup mb='20px' mt='20px'>
                            <InputLabel fs='20px' mb='10px' fw='500'>Email</InputLabel>
                            <Input placeholder={user.email} name='email' onChange={handleChange} mobile={mobile({ width: '100%' })} />
                        </InputGroup>
                        <InputGroup mb='20px' mt='20px'>
                            <InputLabel fs='20px' mb='10px' fw='500'>Phone</InputLabel>
                            <Input placeholder={user.phone} name='phone'  onChange={handleChange} mobile={mobile({ width: '100%' })} />
                        </InputGroup>
                        <InputGroup mb='20px' mt='20px'>
                            <InputLabel fs='20px' mb='10px' fw='500'>Address</InputLabel>
                            <Input placeholder={user.address} name='address'  onChange={handleChange} mobile={mobile({ width: '100%' })} />
                        </InputGroup>
                        {!fetching && <Button type='submit' onClick={handleUpdate}>Update</Button>}
                        {fetching && <Text fs='30px' mr='10px' >Updating please wait...</Text>}
                        {error && <Text mb='10px' mt='10px'color='red'>Error While Updating :(</Text>}
                    </From>
                </Container>
            </Container>

        </Container>
    )
}
