import React, { useState, useEffect } from "react";
import "./content.css"; // Import the CSS file for this component
import "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";

import gallery3 from "../../../assets/images/gallery3.png";
import gallery5 from "../../../assets/images/gallery5.png";

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

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Read the selected file as a data URL and set it as imageUrl
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
    <div>
      <p className="titletext">อัพเดต HomeGURU Content</p>
      <hr
        style={{
          height: "40px",
        }}
      />

      <div className="assign-input-container">
        <div className="area-input">
          หัวข้อ Content :
          <input
            style={{ width: "130px" }} // Set the width using inline CSS
            className="text"
            type="number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={selectedFile ? "blueprint2" : "blueprint"}>
          <div>
            {" "}
            แนบรูปภาพ :
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
            <>
              <p className="text1">ไฟล์ที่ท่านเลือก : {selectedFile.name}</p>
              <hr
        style={{
          height: "20px",
        }}
      />

              <img
                src={imageUrl}
                alt="Selected Image"
                className="selected-image"
                width="400"  // set the width to your desired size in pixels
                height="300" // set the height to your desired size in pixels
              />
            </>
          )}
        </div>
        <div className="address2-input">
          Content Caption :
          <textarea
            style={{ width: "385px", height: "100px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
            className="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="address2-input">
          รายละเอียด content :
          <textarea
            style={{ width: "385px", height: "100px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
            className="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="assign-input1-container">
        <div className="assign1-confirm-button">ยืนยันข้อมูล</div>
      </div>
    </div>
  );
}

export default Assign1;
