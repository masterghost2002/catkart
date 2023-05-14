import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import {mobile} from '../responsive';
const Container = styled.div`
  display: flex;
  ${mobile({flexDirection:"column"})};
  
`
const Left = styled.div`
  padding:20px;
  flex:1;
  display:flex;
  flex-direction: column;

`
const Logo = styled.h1`

`
const Decription = styled.p`  
  margin: 20px 0px;
  font-family: 'Montserrat', sans-serif;
  color: #303030;
`
const SocialContainer = styled.div`
  display: flex;
  ${mobile({justifyContent:"space-between"})};
`
const SocialIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: white;
  background-color: #${props=>props.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  cursor: pointer;
  transition:all 1s ease;
  &:hover{
    transform: scale(1.1);
  }
  ${mobile({marginRight:"0px"})};

`
const Center = styled.div`
  flex:1;
  padding: 20px;
`
const Title = styled.h3`
  margin-bottom: 30px;
`
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  color: #303030;
  transition:all .5s ease;
  cursor: pointer;
  &:hover{
    color: black;
  }

`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`
const Right = styled.div`
  flex:1;
  padding: 20px;

`
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`
const Payment = styled.img`
${mobile({maxWidth:"90%", overflow:"hidden"})};

`
export const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>CatKart</Logo>
        <Decription>
          Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Aut repellat, tempore 
          suscipit reiciendis libero iure cumque 
          asperiores qui tenetur numquam hic vitae
          aliquam incidunt quis laboriosam sapiente dolorum voluptatibus quae.
        </Decription>
        <SocialContainer>
          <SocialIcon bg="3b5998">
            <FacebookIcon/>
          </SocialIcon>
          <SocialIcon bg="E1306C">
            <InstagramIcon/>
          </SocialIcon>
          <SocialIcon bg="333">
            <GitHubIcon/>
          </SocialIcon>
          <SocialIcon bg="0A66C2">
            <LinkedInIcon/>
          </SocialIcon>
        </SocialContainer>
      </Left>


      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
          <ListItem>Home</ListItem>
        </List>
      </Center>


      <Right>
          <Title>Contact</Title>
          <ContactItem>
            <FmdGoodIcon style={{marginRight: "10px"}}/>
            Building A66, DLF, Gurgoan, 122100
          </ContactItem>
          <ContactItem>
            <LocalPhoneIcon style={{marginRight: "10px"}}/>
            +91 123-456-7890
          </ContactItem>
          <ContactItem >
            <EmailIcon style={{marginRight: "10px"}}/>
            contact@catkart.com
          </ContactItem>
          <Payment src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg"/>
      </Right>
    </Container>
  )
}
