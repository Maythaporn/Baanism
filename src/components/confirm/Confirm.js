import React, { useState, useEffect } from "react";
import "./Confirm.css"; // Import the CSS file for this component
import 'react-icons/fa';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { View, TextInput, onChangeText, onChangeNumber } from 'react';

import { FaCamera, FaUserCircle } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaCashRegister } from 'react-icons/fa';
import { FaIdCard } from 'react-icons/fa';

function Confirm(props) {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedSection, setSelectedSection, setSelectedOption, selectedOption] = useState("myProjects", "Payment", "UserInfo"); // Default section
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
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

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    const renderContent = () => {
        switch (selectedSection) {
            case "myProjects":
                return (
                    <div>
                        <div className="profilebar"></div>
                    </div>
                );
            case "Payment":
                return (
                    <div className="profilebar"></div>
                );
            case "UserInfo":
                return (
                    <div className="profilebar">
                        <div className="input-container">
                            <input
                                type="text"
                                className="ConfirmInput-input"
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                className="ConfirmInput-input"
                                placeholder="Surename"
                            />

                            <input
                                type="text"
                                className="ConfirmInput-input"
                                placeholder="Phone Number"
                                keyboardType="numeric"
                            />
                            <input
                                type="text"
                                className="ConfirmInput-input"
                                placeholder="Address"
                            />
                            <select className="ConfirmInput-input">
                                <div className="custom-dropdown">
                                    className="custom-select"
                                    value={selectedOption}
                                    onChange={handleChange}
                                </div>
                                <option value="" disabled selected>
                                    เขต/อำเภอ
                                </option>
                                <option value="option1">สายไหม</option>
                                <option value="option2">ศรีราชา</option>
                                <option value="option3">ลาดพร้าว</option>
                            </select>
                            <div className="dropdown-arrow"></div>

                            <div className="dropdown-arrow"></div>
                            <select className="ConfirmInput-input">
                                <div className="custom-dropdown">
                                    className="custom-select"
                                    value={selectedOption}
                                    onChange={handleChange}
                                </div>
                                <option value="" disabled selected>
                                    จังหวัด
                                </option>
                                <option value="option1">เชียงใหม่</option>
                                <option value="option2">ภูเก็ต</option>
                                <option value="option3">ปทุมธานี</option>
                            </select>
                            <div className="dropdown-arrow"></div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };


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
                    <div className="button">
                        <div
                            className={`button ${selectedSection === "myProject" ? "pressed-button" : ""}`}
                            onClick={() => handleSectionChange("myProject")}>
                            <FaFile size={isMobile ? 10 : 17} color="white" className="button-icon" />
                        โครงการของฉัน
                        </div>
                    </div>
                    <br />

                    <div className="button">
                        <div
                            className={`button ${selectedSection === "Payment" ? "pressed-button" : ""}`}
                            onClick={() => handleSectionChange("Payment")}>
                            <FaCashRegister size={isMobile ? 10 : 17} color="grey" className="button-icon" />
                        การชำระเงิน
                        </div>
                    </div>
                    <br />

                    <div className="button">
                        <div
                            className={`button ${
                                selectedSection === "UserInfo" ? "pressed-button" : ""
                            }`}
                            onClick={() => handleSectionChange("UserInfo")}
                            >
                            <FaIdCard size={isMobile ? 10 : 17} color="grey" className="button-icon" />
                            ข้อมูลผู้ใช้งาน
                        </div>
                    </div>
                </div>
                <br />
            </div>
            {renderContent()}
        </div>
    );
}

export default Confirm;