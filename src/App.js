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

import User from "./components/user-project/User-Project";
import User_header from "./components/user-header/User-header";
import User_footer from "./components/user-footer/User-footer";

import Admin from "./components/admin_profile/project/Admin-Project";
import Admin_header from "./components/admin_profile/header/Admin-header";
import Admin_footer from "./components/admin_profile/footer/Admin-footer";

import User_confirm from "./components/user_confirm/User_confirm";
import Profile_edit from "./components/profile-edit/Profile_edit"

import LpFooter from "./components/landingPageFooter/lpFooter";
import Estimate from "./components/estimate/Estimate"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<>
          <Header />
          <Intro />
          <About />
          <HomeGURU />
          <LpFooter />
        </>} />

        {/* About's route */}
        <Route path="/about" element={<>
          <Header />
          <About />
          <HomeGURU />
          <LpFooter />
        </>} />

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
                path="/forgot-password"
                element={
                  <>
                      <Header />
                      <Forgot />
                      <LpFooter />
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
                path="/user"
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

            <Route
                path="/admin"
                element={
                  <>
                      <Admin_header />
                      <Admin />
                      <Admin_footer />
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
