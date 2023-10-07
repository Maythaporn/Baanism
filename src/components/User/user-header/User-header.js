import logo from "./logo-header.png";
import "./User-header.css";
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
      <nav className={`Usernavbar`}>
        <Link to="/">
          <img src={logo} alt="baanism-logo" className="UserHeaderLogo" />
        </Link>

        <div>
          <Link to="/about">เกี่ยวกับเรา</Link>
        </div>
        <div>
          <Link to="/homecontent">Home GURU Content</Link>
        </div>
        <div>
          <Link to="/">ประเมินราคา</Link>
        </div>
        <div>
          <Link to="/">ติดต่อเรา</Link>
        </div>
        <div>
          <Link>
            <FaBell size={30} color="gray" />
          </Link>
          {"        "}
          <Link>
            <FaUser size={30} color="gray" />
          </Link>
        </div>
      </nav>
    </>
  );
}
