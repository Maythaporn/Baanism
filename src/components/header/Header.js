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

   return (
      <nav className="navBarContainer">
         <Link to="/">
            <img src={logo} alt="baanism-logo" className="logoStyle" />
         </Link>
         <div className="headerMenu">
            <Link to="/about">เกี่ยวกับเรา</Link>
            <Link to="/homecontent" className="space">
               Home GURU Content
            </Link>
            <Link to="/estimate" className="space">
               ประเมินราคา
            </Link>
            <Link to="/contact" className="space">
               ติดต่อเรา
            </Link>
         </div>
         <div className="headerButton">
            <Link>
               <button className="lineButton">ลงชื่อเข้าใช้งาน</button>
            </Link>
            <Link>
               <button className="solidButton">ลงทะเบียน</button>
            </Link>
         </div>
      </nav>
   );
}
