import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../responsive';
import { Badge } from '@mui/material';
import { persistor } from '../store/store';
import { logOut } from '../store/userSlice';
import { clearCart } from '../store/cartRedux';
import { useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = styled.header`   
    position:${props=>props.isSticky?'fixed':'static'};
    width:100%;
    top:0;
    z-index:400;
    background-color:white;
    box-shadow: ${props=>props.isSticky && 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'};
`
const Container = styled.div`
    position:relative;
    height:80px;
    display:flex;
    flex-direction:column;
    z-index:5000;
    ${mobile({ height: "60px" })};
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    height:100%;
    align-items: center;
    justify-content:space-between;
    ${mobile({ padding: "10px 0px" })};
`
const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })};
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display:flex;
    align-items:center;
    margin-left: 25px;
    padding: 5px;
`
const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })};
`
const Center = styled.div`
    display:flex;
    justify-content:center;
    flex:1;
    text-align: center;
    padding: 0;
    ${mobile({ justifyContent: "center", flex: '4' })};
`
const Logo = styled.span`
    text-align:center;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 24px;localStorage.removeItem('persist:root');
    ${mobile({ fontSize: "20px" })};
`
const Right = styled.div`
    flex:1;
    display: flex;
    justify-content: flex-end;
    align-items:center;
    ${mobile({ flex: "2" })};
`
const Button = styled.button`
    cursor: pointer;
    border:none;
    background:transparent;
    display:flex;
    font-size:inherit;
    align-items:center;
    padding:0px;
`
const HamburgerIcon = styled.button`
    border:none;
    background-color:transparent;
    display:none;
    ${mobile({ display: 'block' })};
`
const List = styled.ul`
    list-style-type:none;
    display:flex;
    align-items:center;
    flex-direction:${props => props.direction && props.direction};
    justify-content:space-between;
    ${mobile({ display: 'none' })};
`
const ListItem = styled.li`
    margin-left:${props => props.noMargin ? '0px' : '10px'};
    cursor:pointer;
    color:black;
    ${mobile({ marginBottom: '20px' })};
`
const ListMobile = styled.ul`
    margin:0px;
    padding:60px;
    list-style-type:none;
    background-color:white;
    z-index:100;
    width:100vw;
    display:none;
    flex-direction:column;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    justify-content:space-evenly;
    ${mobile({ display: 'flex' })};
`
const ListCategories = styled.ul`
    margin:0px;
    padding:20px;
    border-radius:6px;
    position: absolute;
    z-index:200;
    background-color:white;
    display:flex;
    flex-direction:column;
    min-height:10vh;
    list-style-type:none;
    ${mobile({ position: 'static' })};
`
const StyledLink = styled(Link)`
    color:black;
    text-decoration:none;
    display:flex;
    align-items:center;
`
const Categories = ({ showCategories, setShowCategories, setIsExtendedNavbar }) => {
    return <>
        <ListItem>
            <Button onClick={() => setShowCategories(prevState => !prevState)}>Categories {showCategories ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</Button>
            {
                showCategories &&
                <>
                    <ListCategories>
                        <ListItem noMargin={true} onClick={() => setIsExtendedNavbar(false)}>
                            <StyledLink to='/products/all'>All</StyledLink>
                        </ListItem>
                        <ListItem noMargin={true} onClick={() => setIsExtendedNavbar(false)}>
                            <StyledLink to='/products/jacket'>Jacket</StyledLink>
                        </ListItem>
                        <ListItem noMargin={true} onClick={() => setIsExtendedNavbar(false)}>
                            <StyledLink to='/products/shirt'  >TShirt</StyledLink>
                        </ListItem>
                        <ListItem noMargin={true} onClick={() => setIsExtendedNavbar(false)}>
                            <StyledLink to='/products/bag'  >Bags</StyledLink>
                        </ListItem>
                        <ListItem noMargin={true} onClick={() => setIsExtendedNavbar(false)}>
                            <StyledLink to='/products/jeans'  >Jeans</StyledLink>
                        </ListItem>
                    </ListCategories>
                </>
            }
        </ListItem>
    </>
}
const MenuLinks = ({ handleLogOut, handleAuthModal, user, setIsExtendedNavbar, showCategories, setShowCategories }) => {
    return <>
        <Categories showCategories={showCategories} setShowCategories={setShowCategories} setIsExtendedNavbar={setIsExtendedNavbar} />
        {
            !user ?
                <>
                    <ListItem ><Button onClick={() => { handleAuthModal(false) }}>Register</Button></ListItem>
                    <ListItem > <Button onClick={() => handleAuthModal(true)}>SignIn</Button></ListItem>
                </> :
                <>
                    <ListItem onClick={() => setIsExtendedNavbar(false)} ><StyledLink to='/order'  >Orders</StyledLink></ListItem>
                    <ListItem ><Button onClick={handleLogOut} >Log-Out</Button></ListItem>
                    <ListItem onClick={() => setIsExtendedNavbar(false)} ><StyledLink to='/userprofile' >Profile</StyledLink></ListItem>
                </>
        }

    </>
}

export const Navbar = ({ setIsModal, setIsLogin, isSticky }) => {
  
    const [showCategories, setShowCategories] = useState(false);
    const [isExtendedNavbar, setIsExtendedNavbar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useDisableBodyScroll(isModal);
    const quantity = useSelector(state => state.cart.quantity);
    
    // user,login,logout
    const user = useSelector(state => state.user.currentUser);
    const handleLogOut = () => {
        setIsExtendedNavbar(false);
        localStorage.removeItem("accessToken");
        persistor.purge();
        dispatch(logOut());
        dispatch(clearCart());
        navigate('/');
    }
    const handleAuthModal = (typeIsLoginIn) => {
        setIsExtendedNavbar(false);
        setIsModal((prevState) => !prevState);
        setIsLogin(typeIsLoginIn);
    };

    // collapse navbar when click outside //mobile varient
    const listRef = useRef();
    useEffect(() => {
        const isClickedOutside = (e) => {
            if (!listRef.current || listRef.current.contains(e.target)) return;
            setIsExtendedNavbar(false);
            setShowCategories(false);
        }
        document.addEventListener("click", isClickedOutside, true);
        return () => {
            document.removeEventListener("click", isClickedOutside);
        };
    }, [isExtendedNavbar]);

    return (
        <Header isSticky={isSticky} id="header">
            <Container isExtendedNavbar={isExtendedNavbar} >
                <Wrapper >
                    <Left>
                        <Language>
                            EN
                        </Language>
                        <SearchContainer>
                            <Input />
                            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
                        </SearchContainer>
                    </Left>
                    <Center>
                        <StyledLink to='/'>
                            <Logo>CatKart</Logo>
                        </StyledLink>
                    </Center>
                    <Right>
                        <StyledLink to='/cart' style={{ marginRight: "20px" }} >
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon color="action"/>
                            </Badge>
                        </StyledLink>
                        {user && <StyledLink to='/wishlist' ><FavoriteBorderIcon /></StyledLink>}
                        <HamburgerIcon onClick={() => setIsExtendedNavbar(prevState => !prevState)}>
                            {
                                isExtendedNavbar ? <CloseIcon /> : <MenuIcon />
                            }
                        </HamburgerIcon>
                        {/* list for Desktop */}
                        <List ref={listRef}>
                            <MenuLinks
                                user={user}
                                handleAuthModal={handleAuthModal}
                                handleLogOut={handleLogOut}
                                quantity={quantity}
                                showCategories={showCategories}
                                setShowCategories={setShowCategories}
                            />
                        </List>
                    </Right>
                </Wrapper>

                {/* menu navbar for mobile outer form the wrapper to make it absolute */}
                {
                    isExtendedNavbar &&
                    <ListMobile ref={listRef} >
                        <MenuLinks
                            user={user}
                            handleAuthModal={handleAuthModal}
                            handleLogOut={handleLogOut}
                            quantity={quantity}
                            setIsExtendedNavbar={setIsExtendedNavbar}
                            showCategories={showCategories}
                            setShowCategories={setShowCategories}
                        />
                    </ListMobile>
                }
            </Container>
        </Header>

    )
}
