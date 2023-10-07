import React, { useState, useEffect } from "react";
import "./User-profile.css"; // Import the CSS file for this component
import "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import logo from "./../../../assets/images/logo-header.png";

import { FaCamera, FaPlus, FaUserCircle } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaUser, FaBell } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";

import UserProject from "./../user-project/User-Project";
import UserConfirm from "./../user_confirm/User_confirm";

function Project() {
  const [isMobile, setIsMobile] = useState(false);
  const [isProjectClicked, setIsProjectClicked] = useState(false);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  const handleProjectClick = () => {
    setIsProjectClicked(true);
    setIsPaymentClicked(false);
    setIsInfoClicked(false);
  };

  const handlePaymentClick = () => {
    setIsProjectClicked(false);
    setIsPaymentClicked(true);
    setIsInfoClicked(false);
  };

  const handleInfoClick = () => {
    setIsProjectClicked(false);
    setIsPaymentClicked(false);
    setIsInfoClicked(true);
  };
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
    <div>
      <div
        className={`projectUsercontainer ${isMobile ? "mobile" : "desktop"}`}
      >
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
        <div className="MimprojectUsercontainer">
          <div className="project-sidebar">
            <br />
            <div className="profile-circle">
              <FaUser
                size={isMobile ? 50 : 50}
                color="white"
                className="user-icon"
              />
              <div className="profile-fix-circle">
                <FaCamera
                  size={isMobile ? 20 : 20}
                  color="black"
                  className="camera-icon"
                />
              </div>
            </div>
            <hr
              style={{
                height: "50px",
              }}
            ></hr>
            <div>
              <div
                onClick={handleProjectClick} // Use parentheses to invoke the function
                className={`${
                  isProjectClicked ? "Userselect-button" : "Userbutton"
                }`}
              >
                <FaFile
                  size={isMobile ? 10 : 17}
                  color={isProjectClicked ? "white" : "gray"}
                  className="button-icon"
                />{" "}
                <p className="profile-graps">โครงการของฉัน</p>
              </div>
              <hr
                style={{
                  height: "10px",
                }}
              ></hr>

              <div
                onClick={handlePaymentClick}
                className={`${
                  isPaymentClicked ? "Userselect-button" : "Userbutton"
                }`}
              >
                <FaCashRegister
                  size={isMobile ? 10 : 17}
                  color={`${isPaymentClicked ? "white" : "gray"}`}
                  className="button-icon"
                />{" "}
                <p className="profile-graps">การชำระเงิน</p>
              </div>

              <hr
                style={{
                  height: "10px",
                }}
              ></hr>

              <div
                onClick={handleInfoClick}
                className={`${
                  isInfoClicked ? "Userselect-button" : "Userbutton"
                }`}
              >
                <FaIdCard
                  size={isMobile ? 10 : 17}
                  color={`${isInfoClicked ? "white" : "grey"}`}
                  className="button-icon"
                />{" "}
                <p className="profile-graps">ข้อมูลผู้ใช้งาน</p>
              </div>
            </div>
            <br />
          </div>

          <div className="project-profilebar">
            {isProjectClicked && (
              <div>
                <UserProject/>
              </div>
            )}
            {isPaymentClicked && <div>Payment content</div>}
            {isInfoClicked && 
            <div>
              <UserConfirm/>
              </div>}
          </div>
        </div>
        <div className="mim-Userfooter">
          <div>Copyright © 2023 BAANISM Co., Ltd. All rights reserved.</div>
          <div>
            <Link to="/">นโยบายการใช้งาน</Link>
          </div>
          <div>
            <Link to="/">ติดต่อสอบถาม</Link>
          </div>
          <div>
            <Link to="/">เงื่อนไขการใช้งาน</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
