import React, { useState, useEffect } from "react";
import "./User-info.css"; // Import the CSS file for this component
import "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { FaCamera, FaPlus, FaUserCircle } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";

function Project() {
  const [isMobile, setIsMobile] = useState(false);
  const [
    selectedSection,
    setSelectedSection,
    setSelectedOption,
    selectedOption,
  ] = useState("myProjects", "Payment", "UserInfo"); // Default section

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const navigate = useNavigate();
  const btnEdit = () => {
    navigate("/user_edit"); // put ur page after /
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
      <h1 className="headText">ยืนยันข้อมูลผู้ใช้งาน</h1>
      <div className="Input-container">
        {/* <label htmlFor="name" className="required-label">*</label> */}
        <input
          id="name"
          type="text"
          className="ConfirmInput-info"
          placeholder="ชื่อจริง"
        />

        {/* <label htmlFor="surename" className="required-label">*</label> */}
        <input
          type="text"
          id="surename"
          className="ConfirmInput-info"
          placeholder="นามสกุล"
        />

        {/* <label htmlFor="phonenumber" className="required-label">*</label> */}
        <input
          id="phonenumber"
          type="text"
          className="ConfirmInput-info"
          placeholder="เบอร์โทร"
          keyboardType="numeric"
        />

        {/* <label htmlFor="address" className="required-label">*</label> */}
        <input
          type="text"
          id="address"
          className="ConfirmInput-info"
          placeholder="ที่อยู่"
        />

        {/* <label htmlFor="province" className="required-label">*</label> */}
        <div className="custom-dropdown">
          <select
            className="ConfirmInput-info "
            value={selectedOption}
            onChange={handleChange}
            id="province"
          >
            <option value="" disabled selected>
              จังหวัด
            </option>
            <option value="option1">เชียงใหม่</option>
            <option value="option2">ภูเก็ต</option>
            <option value="option3">ปทุมธานี</option>
          </select>
        </div>

        {/* <label htmlFor="code" className="required-label">*</label> */}
        <input
          type="text"
          id="code"
          className="ConfirmInput-info"
          placeholder="รหัสไปรษณีย์"
        />

        {/* <label htmlFor="county" className="required-label">*</label> */}
        <div className="custom-dropdown">
          <select
            className="ConfirmInput-info "
            value={selectedOption}
            onChange={handleChange}
            id="county"
            required
          >
            <option value="" disabled selected>
              เขต/อำเภอ
            </option>
            <option value="option1">สายไหม</option>
            <option value="option2">ศรีราชา</option>
            <option value="option3">ลาดพร้าว</option>
          </select>
        </div>
      </div>
      <Link to="/user-edit">
        <button className="setInfoButton" onClick={btnEdit}>
          ยืนยันข้อมูล
        </button>
      </Link>
    </div>
  );
}

export default Project;
