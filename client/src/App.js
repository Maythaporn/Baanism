import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { theme } from "./theme/theme";

import Header from "./components/header/Header";
import Intro from "./components/intro/Intro";
import About from "./components/about/About";
import HomeGURU from "./components/homecontent/HomeGURU";

import MessengerCustomerChat from "./react-messenger-customer-chat";
import Forgot from "./pages/forgot/forgot";
import Register from "./pages/register/register";
import Login from "./pages/login/login";

import User_project from "./components/User/user-project/User-Project";
import User_header from "./components/User/user-header/User-header";
import User_footer from "./components/User/user-footer/User-footer";

import Admin from "./components/Admin/project/Admin-Project";
import Admin_header from "./components/Admin/header/Admin-header";
import Admin_footer from "./components/Admin/footer/Admin-footer";
import Login_header from "./components/User/login_header/login_header";


import User_confirm from "./components/User/user_confirm/User_confirm";
import User_info from "./components/User/user-Info/User-info";
import User_profile from "./components/User/user-profile/User-profile";
import Profile_edit from "./components/User/profile-edit/Profile_edit";
import Document from "./components/User/user-profile/Mydocument";
import Admin_document from "./components/User/user-profile/adminMydocument";

import LpFooter from "./components/landingPageFooter/lpFooter";
import Estimate from "./components/estimate/Estimate";
import Contact from "./pages/contact us/contact";
import ContentInfo from "./components/homecontent/ContentInfo";

// import thisIsLittleFooter from "./components/littleFooter/oneForAllLittleFooter";
import THISISFOOTERJA from "./components/footerForYouNa/footerForAllofU";
import THISISFOOTERNABUTINBLUE from "./components/footerForYouNa/footerForAllofYouButInBlueNa";

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            <>
            {!token && <Header />}
            {role === "admin" && <Admin_header />}
            {role === "user" && <Login_header />}
            <Intro />
            <About />
            <HomeGURU />
            <LpFooter />
          </>
          }
        />

        {/* About's route */}
        <Route
          path="/about"
          element={
            <>
              {!token && <Header />}
              {role === "admin" && <Admin_header />}
              {role === "user" && <Login_header />}
              <About />
              <HomeGURU />
              <LpFooter />
            </>
          }
        />

        {/* Home's route */}
        <Route
          path="/homecontent"
          element={
            <>
              {!token && <Header />}
              {role === "admin" && <Admin_header />}
              {role === "user" && <Login_header />}
              <HomeGURU />
              <LpFooter />
            </>
          }
        />
        <Route
          path="/homecontent/:id"
          element={
            <>
              <Header />
              <ContentInfo />
              <LpFooter />
            </>
          }
        />
        {/* Home's route */}
        <Route
          path="/estimate"
          element={
            <>
              {!token && <Header />}
              {role === "admin" && <Admin_header />}
              {role === "user" && <Login_header />}
              <Estimate />
              <LpFooter />
            </>
          }
        />

        <Route
          path="/document/:phone_number/:id"
          element={
            <>
              <Document />
            </>
          }
        />

        <Route
          path="/admin-document/:id"
          element={
            <>
              <Admin_document />
            </>
          }
        />

        {/* register's route */}
        <Route
          path="/register"
          element={
            <>
              <Header />
              <Register />
              <THISISFOOTERJA />
            </>
          }
        />
        <Route
          path="/forgot"
          element={
            <>
              <Header />
              <Forgot />
              <THISISFOOTERJA />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              {!token && <Header />}
              {role === "admin" && <Admin_header />}
              {role === "user" && <Login_header />}
              <Contact />
              <THISISFOOTERJA />
            </>
          }
        />

        {/* forgot's route */}
        {/* <Route path="/forgot-password" element={<>
          <Forgot />
        </>} /> */}

        {/* login's route */}
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
              <THISISFOOTERJA />
            </>
          }
        />

        <Route
          path="/user/:phone_number"
          element={
            <>
              <Login_header />
              <User_confirm />
              <User_footer />
            </>
          }
        />

        <Route
          path="/user_edit"
          element={
            <>
              <Login_header />
              <Profile_edit />
              <User_footer />
            </>
          }
        />
        {/* 
        อยู่นี่นะหวานจัง */}
        <Route
          path="/user_project"
          element={
            <>
              <Login_header />
              <User_project />
              <User_footer />
            </>
          }
        />

        <Route
          path="/user_profile/:phone_number"
          element={
            <>
              <Login_header />
              <User_profile />
              {/* <THISISFOOTERJA/> */}
              <THISISFOOTERJA />
            </>
          }
        />
        <Route
          path="/user_info"
          element={
            <>
              <Login_header />
              <User_info />
              <User_footer />
            </>
          }
        />

        <Route
          path="/admin"
          element={
            <>
              <Admin_header/>
              <Admin />
              <User_footer />
            </>
          }
        />
      </Routes>

      <MessengerCustomerChat
        pageId="2369383416447624"
        appId="320035067349586"
      />
    </ThemeProvider>
  );
}

export default App;
