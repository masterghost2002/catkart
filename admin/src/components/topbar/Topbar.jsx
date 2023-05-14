import styled from "styled-components";
import NotificationsNoneIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Button } from "@mui/material";
import {useNavigate} from 'react-router-dom';
const Container = styled.div`
    width: 100%;
    height:50px;
    position:sticky;
    top:0px;
    background-color:white;
    z-index:999;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  padding: 5px 20px;
  justify-content: space-between;
  align-items: center;
`
const TopLeft = styled.div`

`
const Logo = styled.span`
  font-weight: 600;
  font-size:20px;
`
const TopRight = styled.div`
  display:flex;
  align-items:center;
`
const IconContainer = styled.div`
  margin-right:20px;
  cursor: pointer;
`
export default function Topbar() {
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem("persist:root"); 
    navigate('/login');
  }
  return (
    <Container>
      <Wrapper>
        <TopLeft>
          <Logo><span style={{ color: "#007FFF" }}>MONKEY</span>-Dashboard</Logo>
        </TopLeft>
        <TopRight>
          <IconContainer>
            <Badge badgeContent={4} color="primary">
              <NotificationsNoneIcon color="action" />
            </Badge>
          </IconContainer>
          <IconContainer>
            <SettingsIcon color="action"/>
          </IconContainer>
          <Button onClick={handleLogOut}>Log Out</Button>
        </TopRight>
      </Wrapper>
    </Container>
  )
}
