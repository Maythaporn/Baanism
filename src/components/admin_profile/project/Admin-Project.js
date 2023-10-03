import React, { useState, useEffect } from "react";
import "./Admin.css"; // Import the CSS file for this component
import 'react-icons/fa';

import { FaCamera, FaHistory, FaRegAddressBook, FaUserCircle } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa';
import { FaUser} from 'react-icons/fa';
import { FaCashRegister } from 'react-icons/fa';
import { FaIdCard } from 'react-icons/fa';

function Project() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add an event listener to track window size changes
    function handleResize() {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    }

    // Initial check
    handleResize();

    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`container ${isMobile ? "mobile" : "desktop"}`}>
      <div className="sidebar">
        <br />
        <div className="profile-circle">
          <FaUser size={isMobile ? 50 : 50} color="white" className="user-icon" />
          <div className="profile-fix-circle">
            <FaCamera size={isMobile ? 20 : 20} color="black" className="camera-icon" />
          </div>
        </div>
        <br />
        <div>
          <div className="botton">
            <FaFile size={isMobile ? 10 : 17} color="white" className="button-icon" /> โครงการทั้งหมด
          </div>
          <br />

          <div className="select2-button">
            <FaHistory size={isMobile ? 10 : 17} color="grey" className="button-icon" /> อัพเดต Home GURU Content
          </div>
          <br />

          <div className="select-button">
            <FaRegAddressBook size={isMobile ? 10 : 17} color="grey" className="button-icon" /> เพิ่มแบบโครงการเข้าระบบ
          </div>
        </div>
        <br />
      </div>

      <div className="profilebar"></div>
    </div>
  );
}

export default Project;
