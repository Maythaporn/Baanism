import React, { useState, useEffect } from "react";
import "./case1.css"; // Import the CSS file for this component
import "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";

import gallery3 from '../../../assets/images/gallery3.png'
import gallery5 from '../../../assets/images/gallery5.png'

import {
  FaCamera,
  FaImage,
  FaPhotoVideo,
  FaPlus,
  FaUserCircle,
} from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import Axios from "axios";

function Assign1(props) {
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    // เรียกใช้งาน API เมื่อคอมโพเนนต์ถูกโหลด
    Axios.get("http://localhost:3001/provinces")
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

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

      <div >
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
                    onChange={(e) => setAdditionalField(e.target.value)}
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
                    onChange={(e) => setAdditionalField(e.target.value)}
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
                <p className="text1">ไฟล์ที่ท่านเลือก : {selectedFile.name}</p>
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
              className={isOptionNULLSelected ? "text-input1" : "text-input"}
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
                    onChange={(e) => setAdditionalField(e.target.value)}
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
                  <p className="text">ช่วงเวลาที่ท่านสะดวกเพื่อติดต่อช่าง : </p>
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
              <div className="assign1-confirm-button">ยืนยันข้อมูล</div>
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
                  <p className="text">ช่วงเวลาที่ท่านสะดวกเพื่อติดต่อช่าง : </p>
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
            
            <div className="assign-input1-container">
              <div className="assign1-confirm-button">ยืนยันข้อมูล</div>
            </div>
          </div>
        )}
      </div>
  );
}

export default Assign1;
