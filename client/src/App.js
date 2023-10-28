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

import User_confirm from "./components/User/user_confirm/User_confirm";
import User_info from "./components/User/user-Info/User-info";
import User_profile from "./components/User/user-profile/User-profile";
import Profile_edit from "./components/User/profile-edit/Profile_edit";
import Document from "./components/User/user-profile/Mydocument";

import LpFooter from "./components/landingPageFooter/lpFooter";
import Estimate from "./components/estimate/Estimate";
import Contact from "./pages/contact us/contact";
import ContentInfo from "./components/homecontent/ContentInfo";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            <>
              <Header />
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
              <Header />
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
              <Header />
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
              <Header />
              <Estimate />
              <LpFooter />
            </>
          }
        />

        <Route
          path="/document/:phone_number/:id"
          element={
            <>
            <Document/>
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
              <LpFooter />
            </>
          }
        />
        <Route
          path="/forgot"
          element={
            <>
              <Header />
              <Forgot />
              <LpFooter />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
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
              <LpFooter />
            </>
          }
        />

        <Route
          path="/user/:phone_number"
          element={
            <>
              <User_header />
              <User_confirm />
              <User_footer />
            </>
          }
        />

        <Route
          path="/user_edit"
          element={
            <>
              <User_header />
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
              <User_project />
            </>
          }
        />

        <Route
          path="/user_profile/:phone_number"
          element={
            <>
              <User_profile />
            </>
          }
        />
        <Route
          path="/user_info"
          element={
            <>
              <User_header />
              <User_info />
              <User_footer />
            </>
          }
        />


        <Route
          path="/admin"
          element={
            <>
              <User_header />
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
