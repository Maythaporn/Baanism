import React, { useState, useEffect } from "react";
import "./User-profile.css"; // Import the CSS file for this component
import "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import logo from "./../../../assets/images/logo-header.png";

import { FaCamera, FaFireExtinguisher, FaPlus, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaUser, FaBell } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import Axios from "axios";

import UserProject from "./../user-project/User-Project";

function Project() {

  const { phone_number } = useParams();

  const [isMobile, setIsMobile] = useState(false);
  const [isProjectClicked, setIsProjectClicked] = useState(false);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(true);
  
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(phone_number);
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [provinces, setProvinces] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    "เลือกประเภทงานที่ท่านต้องการ"
  ); // State to store the selected option

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  const [additionalField, setAdditionalField] = useState("");
  const [additionalFieldVisible, setAdditionalFieldVisible] = useState(false);
  const isOptionNULLSelected = selectedOption === "NULL";
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Check if the selected option is "อื่นๆ"
    if (selectedValue === "NULL") {
      // Show the additional field
      setAdditionalFieldVisible(true);
    } else {
      // Hide the additional field
      setAdditionalFieldVisible(false);
    }
  };

  const handleChangeThaimaps = (e) => {
    setSelectedProvince(e.target.value);
  };

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

    Axios.get("http://localhost:3001/userprofile", {
      params: {
        phone_number: phoneNumber,
      }
    })
      .then((response) => {
        const userData = response.data;
        console.log(userData);
        setFirstname(userData.first_name);
        setLastname(userData.last_name);

      })
      .catch((error) => {
        // Handle any network or server errors here
        console.error("Error fetching user data: ", error);
        // You might want to display a user-friendly error message to the user
      });

    Axios.get("http://localhost:3001/userinfo", {
      params: {
        phone_number: phoneNumber,
      }
    })
      .then((response) => {
        const userData = response.data;
        console.log(userData);
        setAddress(userData.address);
        setProvinces(userData.provinces);
        setDistrict(userData.district);
        setZipcode(userData.provinces);

      })
      .catch((error) => {
        // Handle any network or server errors here
        console.error("Error fetching user data: ", error);
        // You might want to display a user-friendly error message to the user
      });
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
      <div
        className={`projectUsercontainer ${isMobile ? "mobile" : "desktop"}`}
      >
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
                className={`${isProjectClicked ? "Userselect-button" : "Userbutton"
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
                className={`${isPaymentClicked ? "Userselect-button" : "Userbutton"
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
                className={`${isInfoClicked ? "Userselect-button" : "Userbutton"
                  }`}
              >
                <FaIdCard
                  size={isMobile ? 10 : 17}
                  color={`${isInfoClicked ? "white" : "grey"}`}
                  className="button-icon"
                />{" "}
                <p className="profile-graps">ข้อมูลผู้ใช้งาน</p>
              </div>


              <hr
                style={{
                  height: "20px",
                }}
              ></hr>

              <div
                onClick={handleInfoClick}
                className={"Userbutton"
                }
              >
                <FaSignOutAlt
                  size={isMobile ? 10 : 17}
                  color={"grey"}
                  className="button-icon"
                />{" "}
                <p className="profile-graps">ออกจากระบบ</p>
              </div>
            </div>
            <br />
          </div>

          <div className="project-profilebar">
            {isProjectClicked && (
              <div>
                <UserProject />
              </div>
            )}
            {isPaymentClicked && <div>Payment content</div>}
            {isInfoClicked && (
              <div style={{ height: "500px", overflow: "scroll" }}>
                ข้อมูลผู้ใช้งาน
                <hr
                  style={{
                    height: "30px",
                  }}
                ></hr>
                <div className="profile-gridHvan">
                  <div className="text-inputHvan">
                    ชื่อจริง
                    <input
                      style={{ width: "250px"}} // Set the width using inline CSS
                      className="text"
                      type="text"
                      placeholder={firstname}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="text-inputHvan">
                    นามสกุล
                    <input
                      style={{ width: "250px"}} // Set the width using inline CSS
                      className="text"
                      type="text"
                      placeholder={lastname}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                    <div className="phone-inputHvan">
                      เบอร์โทร
                      <input
                        style={{ width: "250px"}} // Set the width using inline CSS
                        className="text"
                        type="text"
                        placeholder={phone_number}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  

                  <div className="address-inputHvan">
                    ที่อยู่
                    <textarea
                      style={{ width: "250px"}} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                      className="text"
                      placeholder={address}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="text-input-provincesHvan">
                    จังหวัด
                    <input
                      style={{ width: "250px" }}
                      id="dropdownProvincs"
                      className="text"
                      placeholder={provinces}
                      value={selectedProvince}
                      onChange={handleChangeThaimaps}
                    >
                    </input>
                  </div>

                  <div className="zip-inputHvan">
                    รหัสไปรษณีย์
                    <input
                      style={{ width: "250px" }} // Set the width using inline CSS
                      className="text"
                      type="text"
                      placeholder={zipcode}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="district-inputHvan">
                    เขต/อำเภอ
                    <br />
                    <input
                      style={{ width: "175px" }}
                      id="dropdownDistrict"
                      className="text"
                      placeholder={district}
                      value={selectedDistrict}
                      onChange={handleChangeThaimaps}
                    >
                    </input>
                  </div>
                </div>

                <hr
                  style={{
                    height: "20px",
                  }}
                ></hr>
                <Link to='/user/${phoneNumber}'>
                  <div className="assign-input1-container">
                    <div className="assign1-confirm-button">แก้ไขข้อมูล</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

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
  );
}

export default Project;
