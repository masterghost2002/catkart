import React, { useRef, useEffect, useState } from 'react';
import { mobile } from '../responsive';
import CloseIcon from '@mui/icons-material/Close';
import Login from './Login';
import Signup from './Signup';
import { login, registerUser } from '../store/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
const Modal = styled.div`
    position: fixed;
    z-index:10000;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    height:100vh;
`
const ModalContent = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const ModalBody = styled.div`
    background-color: #fff;
    margin-right: 10px;
    width: auto;
    display: flex;
    height: auto;
    overflow:auto;
    background-color: teal;
    ${mobile({ width: "100vw", flexDirection: "column", height: '100vh', margin: "0px" })};
    `
const Left = styled.div`
    flex:2;
    padding: 30px;
    background-color: teal;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${mobile({ flex: props => props.isLogin ? '1' : '2' })};
    
`
const LogoContainer = styled.div`

`
const Logo = styled.h1`

`
const Right = styled.div`
    flex:3;
    padding: 30px;
    display: flex;
    background-color:white;
    flex-direction: column;
    justify-content: space-between;
    ${mobile({ borderRadius: "20px 20px 0px 0px" })};
`
const Title = styled.span`
font-size: 40px;
font-family: 'Montserrat', sans-serif;
font-weight: 600; 
`
const Desc = styled.p`

`

const RightFooter = styled.div`
    font-size: 16px;
    font-weight:500;
`
const CloseButton = styled.button`
    align-self: flex-start;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 14px;
    ${mobile({ position: "absolute", right: "10px", top: "10px" })};
`
const Link = styled.a`
    text-decoration: none;
    color: ${props => props.color};
    align-self: flex-end;
`
const Button = styled.button`
    margin-top:${props => props.type === 'link' ? '0px' : '20px'};
    margin-bottom:${props => props.type === 'link' ? '0px' : '20px'};
    padding: ${props => props.type === 'link' ? '0px' : '10px'};
    background-color:${props => props.type === 'link' ? 'transparent' : 'teal'};
    color:${props => props.type === 'link' ? 'teal' : 'white'};
    font-size:inherit;
    font-weight:600;
    border-radius:6px;
    border:none;
    cursor:pointer;
    &:disabled{
        color:white;
        cursor:not-allowed;
    }
`
const Error = styled.span`
    color:red;
`

// loginType false == login, true == signup
export const AuthModal = ({ setIsModal, setIsLogin, isLogin }) => {
    const [userInfo, setUserInfo] = useState({ username: "", password: "" });
    const user = useSelector(state => state.user);
    const [errorInfo, setErrorInfo] = useState({isErorr:false, errorFor:"", errorMessage:""});
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        // passing onClose to close the modal if login is success
        if (isLogin)
        login(dispatch, userInfo, setIsModal);
        else {
            registerUser(userInfo,image, setIsModal, setErrorInfo);
        }
    }
    const handleForm = (e) => {
        setErrorInfo(prevState=>{
            return {
                ...prevState, isError:false,
            }
        });
        setUserInfo((prevState) => {
            return {
                ...prevState, [e.target.name]: e.target.value
            }
        });
    }
    const modalRef = useRef();
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const isClickedOutside = (e) => {
            if (!modalRef.current || modalRef.current.contains(e.target)) return;
            setIsModal(false);
        }
        // the key is using the `true` option
        // `true` will enable the `capture` phase of event handling by browser
        document.addEventListener("click", isClickedOutside, true);
        return () => {
            document.removeEventListener("click", isClickedOutside);
            document.body.style.overflow = 'unset';
        };
    }, [setIsModal]);
    return (
        <Modal >
            <ModalContent ref={modalRef}>
                <ModalBody >
                    {/* heading */}
                    <Left isLogin={isLogin}>
                        <Title>
                            {
                                isLogin ? 'Login' : 'Sign Up'
                            }</Title>
                        <Desc>
                            {
                                isLogin ? 'Get access to your Orders, Wishlist and Recommendations' :
                                    'Sign up with your email to get started'
                            }
                        </Desc>
                        <LogoContainer>
                            <Logo>CatKart</Logo>
                        </LogoContainer>
                    </Left>

                    {/* body or form */}
                    <Right>

                        {/* form content login or signup */}
                        {isLogin ?
                            <Login handleForm={handleForm} errorInfo = {user.errorInfo} /> :
                            <Signup handleForm={handleForm} setImage={setImage} errorInfo={errorInfo} />}

                        {/* handle login signup form */}
                        <Button onClick={handleClick} disabled={user.isFetching}>
                            {
                                isLogin ? 'Log In' : 'Sign Up'
                            }
                        </Button>
                        {user.error && <Error>Something went wrong</Error>}
                        {isLogin && <Link color="#1f3248">Forgot Password?</Link>}

                        {/* footer */}
                        <RightFooter>
                            {
                                isLogin ? 'New to CatKart? ' : 'Have a account? '
                            }
                            <Button onClick={() => setIsLogin(prevState => !prevState)} type="link">
                                {
                                    isLogin ? 'Create New account' : 'Login'
                                }
                            </Button>

                        </RightFooter>
                    </Right>
                </ModalBody>
                <CloseButton onClick={() => setIsModal(false)}><CloseIcon /></CloseButton>
            </ModalContent>
        </Modal>
    )
}
