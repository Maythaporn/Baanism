import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { theme } from "./theme/theme";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Intro from "./components/intro/Intro";
import About from "./components/about/About"; 
import HomeGURU from "./components/homecontent/HomeGURU";

import Profile_header from "./components/user_profile/header/Profile-header";
import Profile_footer from "./components/user_profile/footer/Profile-footer";
import Profile from "./components/user_profile/project/Project";

import Admin_header from "./components/admin_profile/header/Admin-header";
import Admin_footer from "./components/admin_profile/footer/Admin-footer";
import Admin from "./components/admin_profile/project/Admin-Project";

import MessengerCustomerChat from './react-messenger-customer-chat';

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
          <Intro />
          <About />
          <Footer />
        </>} />

             {/* Home's route */}
        <Route path="/homecontent" element={<>
          <Header />
          <HomeGURU />
          <Footer />
        </>} />

        <Route path="/user-profile" element={<>
          <Profile_header />
          <Profile />
          <Profile_footer />
        </>} />

        <Route path="/admin-profile" element={<>
          <Admin_header />
          <Admin />
          <Admin_footer />
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
