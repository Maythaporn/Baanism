import logo from "./../../assets/images/LOGO_Linear_BGW_FTB.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Header() {
   const navigate = useNavigate();
   const [isNavOpen, setIsNavOpen] = useState(false);

   const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
   };

   const btnRegister = () => {
      navigate("/register");
   };

   const btnLogin = () => {
      navigate("/login");
   };

   const closeNav = () => {
      setIsNavOpen(false);
   };

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth >= 769) {
            closeNav(); // Close the navigation when the screen size is 769px or more
         }
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);
}
