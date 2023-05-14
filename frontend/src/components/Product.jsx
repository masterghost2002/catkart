import styled from 'styled-components';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { mobile } from '../responsive';
import { Link } from "react-router-dom";
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.2);
    display:flex;
    align-items: center;
    justify-content: center;
    transition:all 1s ease;
`
const Container = styled.div`
    flex:1;
    margin: 5px;
    min-width: 350px;
    height: 450px;
    display: flex;
    align-items:center;
    justify-content:center;
    background-color:#F0F0F0;
    position: relative;
    &:hover ${Info}{
        opacity: 1;
    }
    ${mobile({ width: "100vw" })}
`
const Circle = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color:white;
    position: absolute;
`

const Image = styled.img`
    height: 75%;
    z-index:2;
`
const Icon = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover{
        background-color: #e6ffff;
        transform: scale(1.1);
    }
`
const DummyButton = styled.button`
    background:transparent;
    border:none;
    display:flex;
    align-items:center;
    justify-content:center;
    height:inherit;
    width:inherit;
`
export const Product = ({ item, addToWishList,inWishList, removeItemFromWishList }) => {
    return (
        <Container>
            <Circle />
            <Image src={item.image ? item.image : item.img} />
            <Info>
                <Icon>
                    <Link to={`/product/${item._id}`} state={item}>
                        <SearchOutlinedIcon />
                    </Link>
                </Icon>
                <Icon>
                   {inWishList?
                       <DummyButton onClick={()=>removeItemFromWishList(item)}>
                            <FavoriteIcon style={{color:'red'}}/>
                        </DummyButton>
                        :<DummyButton onClick={()=>addToWishList(item)}>
                                <FavoriteBorderOutlinedIcon/>
                        </DummyButton>
                    }  
                </Icon>
            </Info>
        </Container>
    )
}
