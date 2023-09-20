import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { theme } from "./theme/theme";
import Header from "./components/header";
import Footer from "./components/footer";
import Intro from "./components/intro";
import About from "./components/about"; 
import HomeGURU from "./components/homecontent"; 

import MessengerCustomerChat from './react-messenger-customer-chat';

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
