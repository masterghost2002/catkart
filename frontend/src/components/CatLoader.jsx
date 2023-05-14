import React from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';
import WalkingMeowLoader from '../assests/loader/WalkingMeowLoader.gif';
import ErrorCat from '../assests/images/404_not_found.png';
const LoaderContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:60vh;
    flex:1;
    ${mobile({flex:'none'})};
    ${props=>props.styling && props.styling};
`
const Image = styled.img`
    margin-top:20px;
    margin-bottom:20px;
    width:10%;
    height:30%;
    ${mobile({width:'50%'})};
`
const LoadingText = styled.span`
    font-size:18px;
    font-weight:500;
    color:teal;
`
export default function CatLoader({type, styling, text, error}) {
    return (
        <LoaderContainer styling={styling}>
            <Image src={error?ErrorCat:(type === undefined?WalkingMeowLoader:type)}/>
            <LoadingText>{text?text:'Kitty is loading your stuff...'}</LoadingText>
        </LoaderContainer>
    )
}
