import { useState, useEffect } from "react";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Transactions from "./pages/Transactions";
import DesktopModeWarning from "./components/warning/DesktopModeWarning";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import { useSelector } from 'react-redux';
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
const Container = styled.div`
  display:flex;
`
function App() {
  const [isDesktop, setIsDesktop] = useState(false);
  const user = useSelector(state => state.user.currentUser);
  useEffect(() => {
    if (window.innerWidth <= 800)
      setIsDesktop(false);
    else setIsDesktop(true);
  }, [])
  const location = useLocation();
  return (
    <>
      {
        isDesktop ? <>
          {user && <Topbar />}
          <Container>
            {user && <Sidebar />}
            <AnimatePresence mode="wait">
              <Routes key={location.pathname} location={location}>
                <Route path="/login" element={<Login />} />
                {user && <>
                  <Route path="/" element={<Home />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/user/newuser" element={<NewUser />} />
                  <Route path="/user/:id" element={<User />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/newproduct" element={<NewProduct />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/transactions" element={<Transactions />} />
                </>}
              </Routes>
            </AnimatePresence>
          </Container>
        </>
          : <DesktopModeWarning />
      }
    </>
  );
}

export default App;
