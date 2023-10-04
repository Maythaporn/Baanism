import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { theme } from "./theme/theme";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Intro from "./components/intro/Intro";
import About from "./components/about/About";
import HomeGURU from "./components/homecontent/HomeGURU";

import MessengerCustomerChat from './react-messenger-customer-chat';
import Forgot from "./pages/forgot/forgot";
import Register from "./pages/register/register";
import Login from "./pages/login/login";

import User from "./components/user_profile/project/Project";
import User_header from "./components/user_profile/header/Profile-header";
import User_footer from "./components/user_profile/footer/Profile-footer";



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
          <Footer />
        </>} />

        {/* About's route */}
        <Route path="/about" element={<>
          <Header />
          <About />
          <HomeGURU />
          <Footer />
        </>} />

        {/* Home's route */}
        <Route path="/homecontent" element={<>
          <Header />
          <HomeGURU />
          <Footer />
        </>} />
        {/* register's route */}
        <Route path="/register" element={<>
          <Header />
          <Register />
          <Footer />
        </>} />
        {/* register's route */}
        <Route path="/forgot-password" element={<>
          <Header />
          <Forgot />
          <Footer />
        </>} />
        {/* login's route */}
        <Route path="/login" element={<>
          <Header />
          <Login />
          <Footer />
        </>} />

           
      <Route path="/user" element={<>
        <User_header />
        <User />
        <User_footer />
        
      </>} />
      
      </Routes>

      <MessengerCustomerChat
        pageId="2369383416447624"
        appId="320035067349586"
      />

    </ThemeProvider>
  );
}

export default App;
