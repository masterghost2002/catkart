import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Announcement } from './components/Announcement';
import { Footer } from './components/Footer';
import { Newsletter } from './components/Newsletter';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthModal } from './components/AuthModal';
import PageRouter from './PageRouter';
import ScrollToTop from './components/customhooks/useScrollTopTop';
import styled from 'styled-components';
const ContentContainer = styled.div`
  padding-top:${props => props.isSticky ? `${props.paddingTop}px` : '0px'};
`
function App() {
  const [isModal, setIsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState();
  window.onscroll = function () {
    //dynamically get the top-badge height to net navbar shadow
    var announcement = document.getElementById("announcement");
    var header = document.getElementById("header");
    if (header) setHeaderHeight(header.offsetHeight);
    if (window.pageYOffset > announcement.offsetHeight && isSticky === false)
      setIsSticky(true);
    else if (window.pageYOffset < announcement.offsetHeight && isSticky === true)
      setIsSticky(false);

  }


  return (
    <Router >
      <ScrollToTop />
      <Announcement />
      {isModal && <AuthModal setIsModal={setIsModal} setIsLogin={setIsLogin} isLogin={isLogin} />}
      <Navbar setIsModal={setIsModal} setIsLogin={setIsLogin} isSticky={isSticky} />
      <ContentContainer isSticky={isSticky} paddingTop={headerHeight}>
        <PageRouter />
      </ContentContainer>
      <Newsletter />
      <Footer />
    </Router>
  );

}

export default App;
