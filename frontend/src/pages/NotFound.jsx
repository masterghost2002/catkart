import React from 'react';
import styled from 'styled-components';
import NOTFoundCat from '../assests/images/404_not_found.png';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
/*
In English
By default, when using flexbox, the padding property is not included in the calculation of the element's
width or height. To include the padding in the calculation, 
you can set the box-sizing property to border-box

*/
const Container = styled.div`
    display:flex;
    width:100vw;
    height:100vh;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    box-sizing:border-box;
    padding:20px;
    ${mobile({height:'80vh'})};
`
const Image = styled.img`
    width:25%;
    ${mobile({width:'100%'})};
`
const Text = styled.div`
    color:#f22a4e;
    font-size:28px;
    text-align:center;
    font-weight:500;
    ${mobile({fontSize:'18px'})};
`
const Button = styled.button`
    padding:10px;
    margin-top:10px;
    background-color:#9397b4;
    border:none;
    border-radius:6px;
    font-size:18px;
    cursor:pointer;
    color:white;
`
const StyledLink = styled(Link)`
    text-decoration:none;
    color:inherit;
    background-color:${props => props.type === 'filled' && '#D3D3D3'};
    padding:${props => props.type === 'filled' && '10px'};
    border-radius:${props => props.type === 'filled' && '6px'};
    font-size:${props => props.type === 'filled' && '18px'};
    font-weight:${props => props.type === 'filled' && '500'};
`
export default function NotFound() {
  return (
    <Container>
        <Image src={NOTFoundCat}/>
        <Text>Opps Kitty unable to find the required page...</Text>
        <StyledLink to='/'>
            <Button>
                Go to home...
            </Button>
        </StyledLink>
    </Container>
  )
}
