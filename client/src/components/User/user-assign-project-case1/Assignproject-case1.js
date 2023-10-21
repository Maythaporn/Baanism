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

  const [area, setArea] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  const [selectedOption, setSelectedOption] = useState(
    "เลือกประเภทงานที่ท่านต้องการ"
  ); // State to store the selected option
  const [additionalField, setAdditionalField] = useState("");
  const [addRoomtype, setaddRoomtype] = useState("");
  const [additionalFieldVisible, setAdditionalFieldVisible] = useState(false);
  const isOptionNULLSelected = selectedOption === "NULL";
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // เรียกใช้งาน API เมื่อคอมโพเนนต์ถูกโหลด
    // Axios.get("http://localhost:3001/provinces")
    //   .then((response) => {
    //     setProvinces(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching provinces:", error);
    //   });
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
        <div className="mimassign-input-container">
          <div className="mimcolumn1">
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
          <div className="mimcolumn1">
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
                    value={addRoomtype}
                    onChange={(e) => setaddRoomtype(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>       
      </div>
  );
}

export default Assign1;