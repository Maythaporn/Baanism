import logo from "./logo-header.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaBell, FaUser } from "react-icons/fa";

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
              width: "40px",
            }}
          ></hr>
          <Link to="/homecontent">Home GURU Content</Link>
          <hr
            style={{
              width: "40px",
            }}
          ></hr>
          <Link to="/">ประเมินราคา</Link>
          <hr
            style={{
              width: "40px",
            }}
          ></hr>
          <Link to="/">ติดต่อเรา</Link>
        </div>
        <div className="mim-container2">
          <Link>
            <FaBell size={30} color="gray" />
          </Link>
          {"        "}
          <Link>
            <FaUser size={30} color="gray" />
          </Link>
        </div>
      </div>
    </>
  );
}
