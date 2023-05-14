import { useState } from "react";
import styled from "styled-components";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { sliderItems } from "../slidetempdata";
import {mobile} from '../responsive';
const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({height:"50vh"})};
`
// we can pass props to the styled components and also use js inside them
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: ${props=> props.direction === "left" && "10px"};
    right: ${props=> props.direction === "right" && "10px"};
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.5;
    cursor: pointer;
    z-index: 2;
`
// margin auto will center the arrow

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    transition: all 1s ease;
    transform: translate(${props=>props.slideIndex*-100}vw);
`
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: ${props=>props.bg};
    ${mobile({height:"100%"})};
`
const ImgContainer = styled.div`
    flex: 1;
    margin-left: 100px;
    margin-top:100px;
    height: 100%;
    max-width: 50%;
    overflow:hidden;
    ${mobile({margin:"0px", flex:"3", maxWidth:'50%'})};
`
const Image = styled.img`
    height: 90%;
    ${mobile({objectFit:"fit", height:"80%"})};
`
const InfoContainer = styled.div`
    padding: 50px;
    flex: 1;
    ${mobile({padding:"10px", flex:"2"})};
`
const Title = styled.h1`
    font-size: 50px;
    ${mobile({fontSize:"30px"})};
`
const Description= styled.p`
    font-family: 'Montserrat', sans-serif;
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
    ${mobile({fontSize:"15px", fontWeight:"700"})};
`
const Button = styled.button`
    border: 2px solid black;
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`
export const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction)=>{
        if(direction === "left"){
            setSlideIndex(slideIndex>0?slideIndex-1:sliderItems.length-1);
        }
        else if(direction === "right"){
            setSlideIndex((slideIndex+1)%sliderItems.length);
        }
    }
  
  return (
    <Container>
        <Arrow direction="left" onClick = {()=>handleClick("left")}>
            <ArrowBackIosNewOutlinedIcon/>
        </Arrow>
        <Wrapper slideIndex = {slideIndex}>
            {sliderItems.map((item)=>
                <Slide key = {item.id} bg={item.bg}>
                    <ImgContainer>
                        <Image src={item.img}/>
                    </ImgContainer>
                <InfoContainer>
                    <Title>
                        {item.title}
                    </Title>
                    <Description>
                        {item.desc}
                    </Description>
                    <Button>
                        SHOW NOW
                    </Button>
                </InfoContainer>
                </Slide>
            )
            }
            
        </Wrapper>
        <Arrow direction = "right" onClick = {()=>handleClick("right")}>
            <ArrowForwardIosOutlinedIcon/>
        </Arrow>
    </Container>
  )
}
