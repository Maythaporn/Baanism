import React, { useState, useEffect } from "react";
import "./Admin.css"; // Import the CSS file for this component
import "react-icons/fa";

import {
  FaCamera,
  FaHistory,
  FaRegAddressBook,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import AllProjects from "../all-projects/All_Projects";
import Assign_admin from "../assign-project/assign-admin";
import Content from "../all-projects/all_content";
import Add_content from "../content/content";
import UpdateProject from "../update-project/update"
import EditUpdateContent from "../content/editcontent"
import { Editestimate } from "../Edit-estimate/Editestimate";

function Project() {
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('phone');
    window.location ='/'
  }
    //authen fetch
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    // ตรวจสอบสถานะการเข้าสู่ระบบและสิทธิ์
    if (!token) {
      // ถ้าไม่มี token ให้เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
      window.location = '/login';
    } else {
      // ถ้ามี token ให้ส่งคำขอเพื่อตรวจสอบสิทธิ์
      fetch('http://localhost:3001/authen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'ok' && role === 'admin') {
            console.log('Authentication success for admin');
          } else {
            window.location = '/login';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isProjectClicked, setIsProjectClicked] = useState(true);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isAddcontentClicked, setIsAddcontentClicked] = useState(false);
  const [isUpdatecontentClicked, setIsUpdatecontentClicked] = useState(false);
  const [isEditEstimateClicked, setisEditEstimateClicked] = useState(false);

  const handleProjectClick = () => {
    setIsProjectClicked(true);
    setIsUpdateClicked(false);
    setIsAddClicked(false);
    setIsAddcontentClicked(false);
    setisEditEstimateClicked(false);
  };

  // Step 2: Create a click handler function
  const handleAddContentClick = () => {
    setIsAddcontentClicked(true);
    setIsProjectClicked(false);
    setIsUpdateClicked(false);
    setIsAddClicked(false);
    setisEditEstimateClicked(false);

  };

  const handleUpdateClick = () => {
    setIsProjectClicked(false);
    setIsUpdateClicked(true);
    setIsAddClicked(false);
    setIsAddcontentClicked(false);
    setisEditEstimateClicked(false);
  };

  const handleAddClick = () => {
    setIsProjectClicked(false);
    setIsUpdateClicked(false);
    setIsAddClicked(true);
    setIsAddcontentClicked(false);
    setisEditEstimateClicked(false);

  };

  const handleEditClick = () => {
    setIsProjectClicked(false);
    setIsUpdateClicked(false);
    setIsAddClicked(false);
    setIsAddcontentClicked(false);
    setisEditEstimateClicked(true);
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
    <div className={`Admincontainer ${isMobile ? "mobile" : "desktop"}`}>
      <div className="admin-sidebar">
        <br />
        <br />
        <br />
        <div>
          <div
            onClick={handleProjectClick}
            className={`${isProjectClicked ? "admin-select-button" : "admin-botton"
              }`}
          >
            <FaFile
              size={isMobile ? 10 : 17}
              color={isProjectClicked ? "white" : "gray"}
              className="button-icon"
            />{" "}
            โครงการทั้งหมด
          </div>
          <br />


          <div
            onClick={handleUpdateClick}
            className={`${isUpdateClicked ? "admin-select-button" : "admin-botton"
              }`}
          >
            <FaHistory
              size={isMobile ? 10 : 17}
              color={isUpdateClicked ? "white" : "gray"}
              className="button-icon"
            />{" "}
            อัพเดต Home GURU Content
          </div>
          <br />


          <div
            onClick={handleAddClick}
            className={`${isAddClicked ? "admin-select-button" : "admin-botton"
              }`}
          >
            <FaRegAddressBook
              size={isMobile ? 10 : 17}
              color={isAddClicked ? "white" : "gray"}
              className="button-icon"
            />{" "}
            เพิ่มแบบโครงการเข้าระบบ
          </div>
          <br />


          <div
            onClick={handleEditClick}
            className={`${isEditEstimateClicked ? "admin-select-button" : "admin-botton"
              }`}
          >
            <FaRegAddressBook
              size={isMobile ? 10 : 17}
              color={isEditEstimateClicked ? "white" : "gray"}
              className="button-icon"
            />{" "}
            แก้ไขหน้าประเมินราคา
          </div>

          <br />
            <div className={"admin-botton"} onClick={handleLogout}>
              <FaSignOutAlt
                size={isMobile ? 10 : 17}
                color={"grey"}
                className="button-icon"
              />{" "}
              ออกจากระบบ
            </div>

        </div>
        <br />
      </div>
      <div style={{overflow: "scroll" }} className="admin-profilebar">
        {isProjectClicked &&
         <AllProjects />}

        {isUpdateClicked && (
          <div>
            <div className="addcontent">

                <div className="adcontent-button" onClick={handleAddContentClick}>
                  <FaPlus size={10} color="white" /> เพิ่ม Home GURU Content
                </div>

              <br></br>
            </div>
          </div>
        )}
        {isUpdateClicked && <UpdateProject />}
        {isAddClicked && (
          <div>
            <Assign_admin />
          </div>
        )}
        {isAddcontentClicked && (
          <div>
            <button className="content-back" onClick={handleUpdateClick}>ย้อนกลับ</button>
            <Add_content />
          </div>
        )}
        {isEditEstimateClicked && (
          <div>
            <Editestimate />
          </div>
        )}
      </div>
        {isUpdatecontentClicked && (
          <div>
            <EditUpdateContent />
          </div>
        )}
    </div>
  );
}

export default Project;
