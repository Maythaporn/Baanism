import logo from "./logo-header.png";
import "./User-header.css";
import { Link, } from "react-router-dom";
import React, {useEffect } from "react";

export default function Header() {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        // closeNav(); // Close the navigation when the screen size is 769px or more
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="UserHeader">
        <Link to="/">
          <img src={logo} alt="baanism-logo" className="UserHeaderLogo" />
        </Link>

        <div className="mim-container">
          <Link to="/about">เกี่ยวกับเรา</Link>
          <hr
            style={{
              width: "20px",
            }}
          ></hr>
          <Link to="/homecontent">Home GURU Content</Link>
          <hr
            style={{
              width: "20px",
            }}
          ></hr>
          <Link to="/">ประเมินราคา</Link>
          <hr
            style={{
              width: "20px",
            }}
          ></hr>
          <Link to="/contact">ติดต่อเรา</Link>
         
        </div>
      </div>
    </>
  );
}
