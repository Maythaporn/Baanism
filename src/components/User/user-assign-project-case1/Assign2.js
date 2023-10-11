import React, { useState, useEffect } from "react";
import "./case1.css"; // Import the CSS file for this component
import "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import logo from "./../../../assets/images/logo-header.png";

import { FaCamera, FaPlus, FaUserCircle } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaUser, FaBell } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";

import { FaImage } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
import { Carousel } from "react-responsive-carousel";

import gallery3 from "../../../assets/images/gallery3.png";
import gallery5 from "../../../assets/images/gallery5.png";


function Project() {
  const [isMobile, setIsMobile] = useState(false);
  const [isProjectClicked, setIsProjectClicked] = useState(false);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  const [email, setEmail] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  const [selectedOption, setSelectedOption] = useState(
    "เลือกประเภทงานที่ท่านต้องการ"
  ); // State to store the selected option
  const [additionalField, setAdditionalField] = useState("");
  const [additionalFieldVisible, setAdditionalFieldVisible] = useState(false);
  const isOptionNULLSelected = selectedOption === "NULL";
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChangeThaimaps = (e) => {
    setSelectedProvince(e.target.value);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

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

  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    // Toggle the checked state when the checkbox is clicked
    setIsChecked(!isChecked);
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

          <div className={isProjectClicked ? "assign1-profilebar" : "project-profilebar"}>
            {isProjectClicked && (
              <div>
          
                  <p className="titletext">สร้างโครงการ</p>
                  <hr
                    style={{
                      height: "20px",
                    }}
                  />
                  <div className="assign-input-container">
                    <div className="column1">
                      <div
                        className={`dropdown-input${
                          isOptionNULLSelected ? "-expanded" : ""
                        }`}
                      >
                        ประเภทงาน
                        <br />
                        <select
                          style={{ width: "175px" }}
                          id="dropdown"
                          className="text"
                          value={selectedOption}
                          onChange={handleChange}
                        >
                          <option value="option1" className="text">
                            ต่อเติม
                          </option>
                          <option value="option2" className="text">
                            รีโนเวท
                          </option>
                          <option value="NULL" className="text">
                            อื่นๆ
                          </option>
                        </select>
                        {isOptionNULLSelected && (
                          <div>
                            <input
                              style={{ width: "175px" }}
                              type="text"
                              className="text"
                              placeholder="กรุณาโปรดระบุ"
                              value={additionalField}
                              onChange={(e) =>
                                setAdditionalField(e.target.value)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="column1">
                      <div
                        className={`dropdown-input${
                          isOptionNULLSelected ? "-expanded" : ""
                        }`}
                      >
                        ประเภทห้อง
                        <br />
                        <select
                          style={{ width: "175px" }}
                          id="dropdown"
                          className="text"
                          value={selectedOption}
                          onChange={handleChange}
                        >
                          <option value="option1" className="text">
                            ห้องนอน
                          </option>
                          <option value="option2" className="text">
                            ห้องน้ำ
                          </option>
                          <option value="option3" className="text">
                            ห้องนั่งเล่น
                          </option>
                          <option value="option4" className="text">
                            ห้องครัว
                          </option>
                          <option value="option5" className="text">
                            ห้องอเนกประสงค์
                          </option>
                          <option value="NULL" className="text">
                            อื่นๆ
                          </option>
                        </select>
                        {isOptionNULLSelected && (
                          <div>
                            <input
                              style={{ width: "175px" }}
                              type="text"
                              className="text"
                              placeholder="กรุณาโปรดระบุ"
                              value={additionalField}
                              onChange={(e) =>
                                setAdditionalField(e.target.value)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="assign-input-container">
                    <div className="column1">
                      <div className="checkbox-container">
                        <p className="text">สถานที่ดำเนินโครงการ : </p>
                        <hr
                          style={{
                            height: "5px",
                          }}
                        ></hr>
                        <div>
                          <input
                            type="checkbox"
                            className="text"
                            checked={isChecked} // Set the checked state
                            onChange={handleCheckboxChange} // Handle checkbox change event
                          />{" "}
                          สถานที่เดียวกันกับที่ลงทะเบียน
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            className="text"
                            checked={isChecked} // Set the checked state
                            onChange={handleCheckboxChange}
                            // Handle checkbox change event
                          />{" "}
                          ไม่ใช่สถานที่เดียวกันกับที่ลงทะเบียน
                        </div>
                      </div>
                    </div>
                    <div className="column1">
                      <div className="area-input">
                        พื้นที่ต่อตารางเมตร
                        <input
                          style={{ width: "130px" }} // Set the width using inline CSS
                          className="text"
                          type="number"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="assign-input-container">
                    <div className="column1">
                      <div className="text-input-provinces">
                        จังหวัด
                        <select
                          style={{ width: "250px" }}
                          id="dropdownProvincs"
                          className="text"
                          value={selectedProvince}
                          onChange={handleChangeThaimaps}
                        >
                          {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="column1">
                      <div className="blueprint">
                        <div>
                          {" "}
                          แบบการออกแบบเบื้องต้น (Blueprint) :
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleFileInputChange}
                          />
                          {"  "}
                          <label htmlFor="fileInput">
                            <FaImage
                              size={30}
                              color="black"
                              className="camera-icon"
                              style={{ cursor: "pointer" }}
                            />
                          </label>
                        </div>
                        {selectedFile && (
                          <p className="text1">
                            ไฟล์ที่ท่านเลือก : {selectedFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="assign-input-container">
                    <div className="column2">
                      <div className="row">
                        <div className="dropdown-input">
                          เขต/อำเภอ
                          <br />
                          <select
                            style={{ width: "175px" }}
                            id="dropdownDistrict"
                            className="text"
                            value={selectedDistrict}
                            onChange={handleChangeThaimaps}
                          >
                            {district.map((district) => (
                              <option key={district.id} value={district.id}>
                                {district.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="dropdown-input">
                          แขวง/ตำบล
                          <br />
                          <select
                            style={{ width: "175px" }}
                            id="dropdown"
                            className="text"
                            value={selectedOption}
                            onChange={handleChange}
                          >
                            <option value="option1" className="text">
                              ห้องนอน
                            </option>
                            <option value="option2" className="text">
                              ห้องน้ำ
                            </option>
                            <option value="option3" className="text">
                              ห้องนั่งเล่น
                            </option>
                            <option value="option4" className="text">
                              ห้องครัว
                            </option>
                            <option value="option5" className="text">
                              ห้องอเนกประสงค์
                            </option>
                            <option value="NULL" className="text">
                              อื่นๆ
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="zip-input">
                        รหัสไปรษณีย์
                        <input
                          style={{ width: "130px" }} // Set the width using inline CSS
                          className="text"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="column2">
                      <div className="address-input">
                        ที่อยู่
                        <textarea
                          style={{ width: "385px", height: "100px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                          className="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="assign-input-container">
                    <div className="column1">
                      <div className="text-input">
                        ลิ้งค์ Google Maps
                        <input
                          style={{ width: "150px" }} // Set the width using inline CSS
                          className="text"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="column1">
                      <div
                        className={
                          isOptionNULLSelected ? "text-input1" : "text-input"
                        }
                      >
                        ชื่อโครงการที่อยู่อาศัย
                        <br />
                        <select
                          style={{ width: "175px" }}
                          id="dropdown"
                          className="text"
                          value={selectedOption}
                          onChange={handleChange}
                        >
                          <option value="option1" className="text">
                            ห้องนอน
                          </option>
                          <option value="option2" className="text">
                            ห้องน้ำ
                          </option>
                          <option value="option3" className="text">
                            ห้องนั่งเล่น
                          </option>
                          <option value="option4" className="text">
                            ห้องครัว
                          </option>
                          <option value="option5" className="text">
                            ห้องอเนกประสงค์
                          </option>
                          <option value="NULL" className="text">
                            อื่นๆ
                          </option>
                        </select>
                        {isOptionNULLSelected && (
                          <div>
                            <input
                              style={{ width: "175px" }}
                              type="text"
                              className="text"
                              placeholder="กรุณาโปรดระบุ"
                              value={additionalField}
                              onChange={(e) =>
                                setAdditionalField(e.target.value)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      height: "20px",
                    }}
                  ></hr>
                  <hr className="new4"></hr>
                  <hr
                    style={{
                      height: "20px",
                    }}
                  ></hr>

                  <p className="titletext2">รายละเอียดเพิ่มเติมโครงการ</p>

                  <hr
                    style={{
                      height: "20px",
                    }}
                  ></hr>

                  {isOptionNULLSelected ? (
                    <div>
                      <div className="assign-input-container">
                        <div className="column1">
                          <div className="area-input">
                            กำหนดเริ่มดำเนินโครงการ
                            <input
                              style={{ width: "130px" }} // Set the width using inline CSS
                              className="text"
                              type="date"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="column1">
                          <div className="checkbox1-container">
                            <p className="text">
                              ช่วงเวลาที่ท่านสะดวกเพื่อติดต่อช่าง :{" "}
                            </p>
                            <hr
                              style={{
                                height: "5px",
                              }}
                            ></hr>
                            <div>
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              จันทร์{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              อังคาร{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              พุธ{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              พฤหัสบดี{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              ศุกร์{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              เสาร์{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              อาทิตย์
                            </div>
                            <hr
                              style={{
                                height: "2px",
                              }}
                            ></hr>
                            <div>
                              เวลา : {"  "}
                              <input
                                type="time"
                                style={{ width: "110px" }}
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange}
                                // Handle checkbox change event
                              />
                              {"    "} ถึง {"     "}
                              <input
                                style={{ width: "100px" }}
                                type="time"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange}
                                // Handle checkbox change event
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="assign-input-container">
                        <div className="column1">
                          <p className="text2">ดูแบบบ้านในแต่ละโครงการ</p>

                          <div className="dropdown-input">
                            รูปแบบบ้าน
                            <select
                              style={{ width: "175px" }}
                              id="dropdown"
                              className="text"
                              value={selectedOption}
                              onChange={handleChange}
                            >
                              <option value="option1" className="text">
                                ห้องนอน
                              </option>
                              <option value="option2" className="text">
                                ห้องน้ำ
                              </option>
                              <option value="option3" className="text">
                                ห้องนั่งเล่น
                              </option>
                              <option value="option4" className="text">
                                ห้องครัว
                              </option>
                              <option value="option5" className="text">
                                ห้องอเนกประสงค์
                              </option>
                              <option value="NULL" className="text">
                                อื่นๆ
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="assign-input1-container">
                        <Carousel
                          showArrows={true} // Show navigation arrows
                          showThumbs={false} // Hide thumbnail images
                          infiniteLoop={true} // Enable infinite loop
                          autoPlay={true} // Auto play the carousel
                          interval={5000} // Time (in milliseconds) between slides
                          height="50px"
                        >
                          <div>
                            <img src={gallery3} alt="Image 1" />
                            <p className="legend">Caption for Image 1</p>
                          </div>
                          <div>
                            <img src={gallery5} alt="Image 2" />
                            <p className="legend">Caption for Image 2</p>
                          </div>

                          {/* Add more images as needed */}
                        </Carousel>
                      </div>

                      <div className="assign-input-container">
                        <div className="column1">
                          <div className="blueprint">
                            <div>
                              รูปภาพหน้างานจริง :
                              <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleFileInputChange}
                              />
                              {"  "}
                              <label htmlFor="fileInput">
                                <FaImage
                                  size={30}
                                  color="black"
                                  className="camera-icon"
                                  style={{ cursor: "pointer" }}
                                />
                              </label>
                            </div>
                            {selectedFile && (
                              <p className="text1">
                                ไฟล์ที่ท่านเลือก : {selectedFile.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="assign-input-container">
                        <div className="column2">
                          <div className="info-input">
                            ข้อมูลเพิ่มเติม
                            <textarea
                              style={{ width: "385px", height: "100px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                              className="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="assign-input1-container">
                        <div className="assign1-confirm-button">
                          ยืนยันข้อมูล
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="assign-input-container">
                        <div className="column1">
                          <div className="area-input">
                            กำหนดเริ่มดำเนินโครงการ
                            <input
                              style={{ width: "130px" }} // Set the width using inline CSS
                              className="text"
                              type="date"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="column1">
                          <div className="checkbox1-container">
                            <p className="text">
                              ช่วงเวลาที่ท่านสะดวกเพื่อติดต่อช่าง :{" "}
                            </p>
                            <hr
                              style={{
                                height: "5px",
                              }}
                            ></hr>
                            <div>
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              จันทร์{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              อังคาร{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              พุธ{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              พฤหัสบดี{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              ศุกร์{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              เสาร์{" "}
                              <input
                                type="checkbox"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange} // Handle checkbox change event
                              />{" "}
                              อาทิตย์
                            </div>
                            <hr
                              style={{
                                height: "2px",
                              }}
                            ></hr>
                            <div>
                              เวลา : {"  "}
                              <input
                                type="time"
                                style={{ width: "110px" }}
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange}
                                // Handle checkbox change event
                              />
                              {"    "} ถึง {"     "}
                              <input
                                style={{ width: "100px" }}
                                type="time"
                                className="text"
                                checked={isChecked} // Set the checked state
                                onChange={handleCheckboxChange}
                                // Handle checkbox change event
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="assign-input-container">
                        <div className="column1">
                          <div className="blueprint">
                            <div>
                              รูปภาพหน้างานจริง :
                              <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleFileInputChange}
                              />
                              {"  "}
                              <label htmlFor="fileInput">
                                <FaImage
                                  size={30}
                                  color="black"
                                  className="camera-icon"
                                  style={{ cursor: "pointer" }}
                                />
                              </label>
                            </div>
                            {selectedFile && (
                              <p className="text1">
                                ไฟล์ที่ท่านเลือก : {selectedFile.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="assign-input-container">
                        <div className="column2">
                          <div className="info-input">
                            ข้อมูลเพิ่มเติม
                            <textarea
                              style={{ width: "385px", height: "100px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                              className="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="assign-input1-container">
                        <div className="assign1-confirm-button">
                          ยืนยันข้อมูล
                        </div>
                      </div>
                    </div>
                  )}
                </div>
            
            )}
            {isPaymentClicked && <div>Payment content</div>}
            {isInfoClicked && (
              <div>
                ยืนยันข้อมูลผู้ใช้งาน
                <hr
                  style={{
                    height: "30px",
                  }}
                ></hr>
                <div className="assign-input-container">
                  <div className="column1">
                    <div className="text-input">
                      ลิ้งค์ Google Maps
                      <input
                        style={{ width: "150px" }} // Set the width using inline CSS
                        className="text"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="column1">
                    <div className="text-input">
                      ลิ้งค์ Google Maps
                      <input
                        style={{ width: "150px" }} // Set the width using inline CSS
                        className="text"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="assign-input-container">
                  <div className="column2">
                    <div className="row">
                      <div className="zip-input">
                        รหัสไปรษณีย์
                        <input
                          style={{ width: "130px" }} // Set the width using inline CSS
                          className="text"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="zip-input">
                      รหัสไปรษณีย์
                      <input
                        style={{ width: "130px" }} // Set the width using inline CSS
                        className="text"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="column2">
                    <div className="address-input">
                      ที่อยู่
                      <textarea
                        style={{ width: "385px", height: "100px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                        className="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="assign-input-container">
                  <div className="column1">
                    <div className="text-input">
                      ลิ้งค์ Google Maps
                      <input
                        style={{ width: "150px" }} // Set the width using inline CSS
                        className="text"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="column1">
                    <div className="text-input">
                      ลิ้งค์ Google Maps
                      <input
                        style={{ width: "150px" }} // Set the width using inline CSS
                        className="text"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    height: "20px",
                  }}
                ></hr>
                <div className="assign-input1-container">
                  <div className="assign1-confirm-button">ยืนยันข้อมูล</div>
                </div>
              </div>
            )}
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
