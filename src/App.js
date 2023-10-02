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




function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<>
          <Intro />
          <About />
          <HomeGURU />
        </>} />

        {/* About's route */}
        <Route path="/about" element={<>
          <About />
          <HomeGURU />
        </>} />

        {/* Home's route */}
        <Route path="/homecontent" element={<>
          <HomeGURU />
        </>} />
        {/* register's route */}
        <Route path="/register" element={<>
          <Register />
        </>} />
        {/* register's route */}
        <Route path="/forgot-password" element={<>
          <Forgot />
        </>} />
        {/* login's route */}
        <Route path="/login" element={<>
          <Login />
        </>} />
      </Routes>
      

      <MessengerCustomerChat
        pageId="2369383416447624"
        appId="320035067349586"
      />

      <Footer />
    </ThemeProvider>
  );
}

export default App;
