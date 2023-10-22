import React, { useState, useEffect } from "react";
import "./User-profile.css"; // Import the CSS file for this component
import "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";

import gallery3 from "../../../assets/images/gallery3.png";
import gallery4 from "../../../assets/images/gallery4.png";
import gallery5 from "../../../assets/images/gallery5.png";

import logo from "./../../../assets/images/logo-header.png";

import Thai_provinces from "../../../thai_provinces.js";
import Thai_district from "../../../thai_amphures.js";
import Thai_subdistrict from "../../../thai_tambons.js";

import {
  FaCamera,
  FaFireExtinguisher,
  FaPlus,
  FaSignOutAlt,
  FaUserCircle,
  FaImage,
} from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaUser, FaBell } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import Axios from "axios";

function Project() {
  const navigate = useNavigate();
  const { phone_number } = useParams();

  const [isMobile, setIsMobile] = useState(false);
  const [isProjectCreateClicked, setIsProjectCreateClicked] = useState(false);
  const [isProjectClicked, setIsProjectClicked] = useState(false);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(true);

  //หน้ายืนยันข้อมูล
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(phone_number);
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");

  const [zipcode, setZipcode] = useState("");
  const [postcode, setPostcode] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [addProjectField, setaddProjectField] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  //choice
  const [addProject, setaddProject] = useState("ต่อเติม");
  const [isTypeNULLSelected, setisTypeNULLSelected] = useState(false);

  const handleTypeChange = (event) => {
    const addProject = event.target.value;
    setaddProject(addProject);

    // Check if the selected option is "อื่นๆ"
    if (addProject === "") {
      // Show the additional field
      setisTypeNULLSelected(true);
    } else {
      // Hide the additional field
      setisTypeNULLSelected(false);
    }
  };

  const [addRoom, setaddRoom] = useState("ห้องนอน");
  const [isRoomNULLSelected, setisRoomNULLSelected] = useState(false);

  const handleRoomChange = (event) => {
    const addRoom = event.target.value;
    setaddRoom(addRoom);

    // Check if the selected option is "อื่นๆ"
    if (addRoom === "") {
      // Show the additional field
      setisRoomNULLSelected(true);
    } else {
      // Hide the additional field
      setisRoomNULLSelected(false);
    }
  };

  //place
  const [Option, setOption] = useState("");

  const handleOptionChange = (event) => {

    setOption(event.target.value);

    console.log(Option);

    if (Option === "yes") {
      setSelectedDistrict(district);
      selectedProvince(provinces);
      setPostcode(zipcode);
      
    } else if(Option === "no") {
      setAddress("");
      setSelectedDistrict('');
      selectedProvince('');
      setPostcode('');      
    }
  };

  //area
  const [area, setarea] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [project, setProject] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(""); // Use a single province, not an array
  const [provinces, setProvinces] = useState(""); // Use an array for provinces
  const [province, setProvince] = useState([]); // Use an array for provinces

  const [subdistrict, setSubdistrict] = useState([]);
  const [District, setdistrict] = useState([]);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");

  const [addressfield, setAddressField] = useState("");
  const [googlelink, setGoogleLink] = useState("");

  const [DateOption, setDateOption] = useState("yes");

  const handleDateOptionChange = (event) => {
    setDateOption(event.target.value);
  };

  const [projectName, setprojectName] = useState("โปรดระบุ");
  const [isProjectNameNULLSelected, setisProjectNameNULLSelected] =
    useState(false);

  const handleProjectChange = (event) => {
    const projectName = event.target.value;
    setprojectName(projectName);

    // Check if the selected option is "อื่นๆ"
    if (projectName === "") {
      // Show the additional field

      setisProjectNameNULLSelected(true);
    } else {
      // Hide the additional field

      setisProjectNameNULLSelected(false);
    }
  };

  const btnClick = () => {
    setIsProjectClicked(false);
    setIsPaymentClicked(false);
    setIsInfoClicked(false);
    setIsProjectCreateClicked(true);
  };

  const handleProjectClick = () => {
    setIsProjectClicked(true);
    setIsPaymentClicked(false);
    setIsInfoClicked(false);
    setIsProjectCreateClicked(false);
  };

  const handlePaymentClick = () => {
    setIsProjectClicked(false);
    setIsPaymentClicked(true);
    setIsInfoClicked(false);
    setIsProjectCreateClicked(false);
  };

  const handleInfoClick = () => {
    setIsProjectClicked(false);
    setIsPaymentClicked(false);
    setIsInfoClicked(true);
    setIsProjectCreateClicked(false);
  };

  const handleDeleteProject = (projectId) => {
    // Send an HTTP DELETE request to the server to delete the project.
    console.log(projectId);

    Axios.post("http://localhost:3001/delete-project", {
      projectId: projectId,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("ลบโครงการเรียบร้อย");
          // navigate(`/user_profile/${phoneNumber}`); // Redirect to the user profile page with phone_number as a parameter
        }
      })
      .catch((error) => {
        alert("เกิดข้อผิดพลากกรุณาลองใหม่อีกครั้ง");
      }); // put ur page after /

  };
  

  const createProject = () => {
    Axios.post("http://localhost:3001/createProject", {
      project_type: addProject,
      room_type: addRoom,
      address: address,
      provinces: selectedProvince,
      district: selectedDistrict,
      subdistrict: selectedSubDistrict,
      sq_meter: area,
      zipcode: postcode,
      phone_number: phoneNumber,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("สร้างโครงการเรียบร้อยแล้ว");
          navigate(`/user_profile/${phoneNumber}`); // Redirect to the user profile page with phone_number as a parameter
        }
      })
      .catch((error) => {
        alert("เกิดข้อผิดพลากกรุณาลองใหม่อีกครั้ง");
      }); // put ur page after /

    setIsProjectClicked(true);
    setIsPaymentClicked(false);
    setIsInfoClicked(false);
    setIsProjectCreateClicked(false);

  };
  useEffect(() => {

    console.log("Provinces : ", selectedProvince);
    console.log("Subdistrict : ", selectedSubDistrict);

    setProvince(Thai_provinces);
    setdistrict(Thai_district);
    setSubdistrict(Thai_subdistrict);

    Axios.get("http://localhost:3001/project", {
      params: {
        phone_number: phoneNumber,
      },
    })
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        // Handle any network or server errors here
        console.error("Error fetching user data: ", error);
        // You might want to display a user-friendly error message to the user
      });

    Axios.get("http://localhost:3001/userprofile", {
      params: {
        phone_number: phoneNumber,
      },
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
      },
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

              <hr
                style={{
                  height: "20px",
                }}
              ></hr>

              <div onClick={handleInfoClick} className={"Userbutton"}>
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
               <div
               style={{ height: "500px", width: "910px", overflow: "scroll" }}
             >
                <div className="adproject-button" onClick={btnClick}>
                  <FaPlus size={10} color="white" /> เพิ่มโครงการ
                </div>
                {project.map((e) => (
                <div className="admin-project-container" key={e.id}>
                    <div className='info-left'>
                        <p className='project-title'>{e.project_type}</p>
                        <p>ประเภทห้อง : {e.room_type}</p>
                        <p>สถานที่ : {e.address}</p>
                    </div>
                    <div className='info-right'>
                        <p>สถานะ : <span class="status"></span>{e.status}</p>
                        <div className='edit'>
                            <button className='edit-btn'>แก้ไขข้อมูล</button>
                            <span className='space'>|</span>
                            <button className='edit-btn' onClick={() => handleDeleteProject(e.id)}>ลบโครงการ</button>
                        </div>
                    </div>
                </div>
            ))}
              </div>
            )}
            {isPaymentClicked && <div>Payment content</div>}
            {isProjectCreateClicked && (
              <div
                style={{ height: "500px", width: "910px", overflow: "scroll" }}
              >
                <p className="titletext">สร้างโครงการ</p>
                <hr
                  style={{
                    height: "20px",
                  }}
                ></hr>
                <div class="grid-container">
                  <div class="grid-item">
                    <div
                      className={`dropdown-input${
                        isTypeNULLSelected ? "-expanded" : ""
                      }`}
                    >
                      ประเภทงาน
                      <br />
                      <select
                        style={{ width: "175px" }}
                        id="dropdown"
                        className="text"
                        value={addProject}
                        onChange={handleTypeChange}
                      >
                        <option value="ต่อเติม" className="text">
                          ต่อเติม
                        </option>
                        <option value="รีโนเวท" className="text">
                          รีโนเวท
                        </option>
                        <option value="" className="text">
                          อื่นๆ
                        </option>
                      </select>
                      {isTypeNULLSelected && (
                        <div>
                          <input
                            style={{ width: "175px" }}
                            type="text"
                            className="text"
                            placeholder="กรุณาโปรดระบุ"
                            value={addProject}
                            onChange={(e) => setaddProject(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="grid-item">
                    <div
                      className={`dropdown-input${
                        isRoomNULLSelected ? "-expanded" : ""
                      }`}
                    >
                      ประเภทห้อง
                      <br />
                      <select
                        style={{ width: "175px" }}
                        id="dropdown"
                        className="text"
                        value={addRoom}
                        onChange={handleRoomChange}
                      >
                        <option value="ห้องนอน" className="text">
                          ห้องนอน
                        </option>
                        <option value="ห้องน้ำ" className="text">
                          ห้องน้ำ
                        </option>
                        <option value="ห้องนั่งเล่น" className="text">
                          ห้องนั่งเล่น
                        </option>
                        <option value="ห้องครัว" className="text">
                          ห้องครัว
                        </option>
                        <option value="ห้องอเนกประสงค์" className="text">
                          ห้องอเนกประสงค์
                        </option>
                        <option value="" className="text">
                          อื่นๆ
                        </option>
                      </select>
                      {isRoomNULLSelected && (
                        <div>
                          <input
                            style={{ width: "175px" }}
                            type="text"
                            className="text"
                            placeholder="กรุณาโปรดระบุ"
                            value={addRoom}
                            onChange={(e) => setaddRoom(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="grid-item">
                    <div className="checkbox-container">
                      <p className="text">สถานที่ดำเนินโครงการ : </p>
                      <hr
                        style={{
                          height: "5px",
                        }}
                      ></hr>
                      <div>
                        <input
                          type="radio"
                          name="options"
                          value="yes"
                          checked={Option === "yes"}
                          onChange={handleOptionChange}
                        />{" "}
                        สถานที่เดียวกันกับที่ลงทะเบียน
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="options"
                          value="no"
                          checked={Option === "no"}
                          onChange={handleOptionChange}
                        />{" "}
                        ไม่ใช่สถานที่เดียวกันกับที่ลงทะเบียน
                      </div>
                    </div>
                  </div>
                  <div class="grid-item">
                    {" "}
                    <div className="area-input">
                      พื้นที่ต่อตารางเมตร
                      <input
                        style={{ width: "130px" }} // Set the width using inline CSS
                        className="text"
                        type="text"
                        value={area}
                        onChange={(e) => setarea(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="grid-item">
                    <div className="text-input-provinces">
                      จังหวัด
                      <select
                        style={{ width: "250px" }}
                        id="dropdownProvinces"
                        className="text"
                        value={selectedProvince} // The selected province is bound to the value of the select element
                        onChange={(e) => setSelectedProvince(e.target.value)} // This function will be called when the selection changes
                      >
                        {/* Default empty option */}
                        {province.map((state) => (
                          <option key={state.id} value={state.name_th}>
                            {state.name_th}
                          </option>
                        ))}
                      </select>
                    </div>
                    <hr
                      style={{
                        height: "10px",
                      }}
                    ></hr>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="dropdown-input">
                        เขต/อำเภอ
                        <br />
                        <select
                          style={{ width: "175px" }}
                          id="dropdownDistrict"
                          className="text"
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                          {" "}
                          {District.filter((state) => {
                            const provinceIds = province
                              .filter(
                                (province_id) =>
                                  province_id.name_th === selectedProvince
                              )
                              .map((province_id) => province_id.id);
                            return provinceIds.includes(state.province_id);
                          }).map((state) => (
                            <option key={state.id} value={state.name_th}>
                              {state.name_th}
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
                          value={selectedSubDistrict}
                          onChange={(e) =>
                            setSelectedSubDistrict(e.target.value)
                          }
                        >
                          {/* Default empty option */}
                          {" "}
                          {subdistrict.filter((state) => {
                            const districtIds = District
                              .filter(
                                (district_id) =>
                                  district_id.name_th === selectedDistrict
                              )
                              .map((district_id) => district_id.id);
                            return districtIds.includes(state.amphure_id);
                          }).map((state) => (
                            <option key={state.id} value={state.name_th}>
                              {state.name_th}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="grid-item">
                    <div className="address-input">
                      ที่อยู่
                      <textarea
                        style={{ width: "385px", height: "100px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                        className="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="grid-item">
                    <div className="zip-input">
                      รหัสไปรษณีย์
                      <input
                        style={{ width: "130px" }} // Set the width using inline CSS
                        className="text"
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="grid-item">
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
                        <label htmlFor="fileInput" style={{ alignItems: "center" , marginInline:10}}>
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
      
                  <div class="grid-item">
                    <div
                      className={
                        isProjectNameNULLSelected ? "text-input1" : "text-inputProject"
                      }
                    >
                      ชื่อโครงการที่อยู่อาศัย
                      {/* <br /> */}
                      <select
                        style={{ width: "175px" }}
                        id="dropdown"
                        className="text"
                        value={projectName}
                        onChange={handleProjectChange}
                      >
                        <option value="ห้องนอน" className="text">
                          ห้องนอน
                        </option>
                        <option value="ห้องน้ำ" className="text">
                          ห้องน้ำ
                        </option>
                        <option value="ห้องนั่งเล่น" className="text">
                          ห้องนั่งเล่น
                        </option>
                        <option value="ห้องครัว" className="text">
                          ห้องครัว
                        </option>
                        <option value="ห้องอเนกประสงค์" className="text">
                          ห้องอเนกประสงค์
                        </option>
                        <option value="" className="text">
                          อื่นๆ
                        </option>
                      </select>
                      {isProjectNameNULLSelected && (
                        <div>
                          <input
                            style={{ width: "175px" }}
                            type="text"
                            className="text"
                            placeholder="กรุณาโปรดระบุ"
                            value={projectName}
                            onChange={(e) => setprojectName(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="grid-item">
                    <div className="linkgoogleInput ">
                      Link Google Maps
                      <input
                        style={{ width: "175px" }} // Set the width using inline CSS
                        className="text"
                        type="text"
                        value={googlelink}
                        onChange={(e) => setGoogleLink(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    height: "60px",
                  }}
                ></hr>
                <hr className="new4"></hr>
                <hr
                  style={{
                    height: "40px",
                  }}
                ></hr>
                <p className="titletext2">รายละเอียดเพิ่มเติมโครงการ</p>
                <hr
                  style={{
                    height: "40px",
                  }}
                ></hr>

                <div class="grid-container">
                  <div class="grid-item">
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
                  <div class="grid-item">
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
                          type="radio"
                          name="options"
                          value="monday"
                          checked={DateOption === "monday"}
                          onChange={handleDateOptionChange}
                        />{" "}
                        จันทร์{" "}
                        <input
                          type="radio"
                          name="options"
                          value="tuesday"
                          checked={DateOption === "tuesday"}
                          onChange={handleDateOptionChange}
                        />{" "}
                        อังคาร{" "}
                        <input
                          type="radio"
                          name="options"
                          value="wednesday"
                          checked={DateOption === "wednesday"}
                          onChange={handleDateOptionChange}
                        />{" "}
                        พุธ{" "}
                        <input
                          type="radio"
                          name="options"
                          value="thursday"
                          checked={DateOption === "thursday"}
                          onChange={handleDateOptionChange}
                        />{" "}
                        พฤหัสบดี{" "}
                        <input
                          type="radio"
                          name="options"
                          value="friday"
                          checked={DateOption === "friday"}
                          onChange={handleDateOptionChange}
                        />{" "}
                        ศุกร์{" "}
                        <input
                          type="radio"
                          name="options"
                          value="saturnday"
                          checked={DateOption === "saturnday"}
                          onChange={handleDateOptionChange}
                        />{" "}
                        เสาร์{" "}
                        <input
                          type="radio"
                          name="options"
                          value="sunday"
                          checked={DateOption === "sunday"}
                          onChange={handleDateOptionChange}
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

                          // Handle checkbox change event
                        />
                        {"    "} ถึง {"     "}
                        <input
                          style={{ width: "100px" }}
                          type="time"
                          className="text"

                          // Handle checkbox change event
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {isProjectNameNULLSelected ? (
                  <div>
                    <hr
                      style={{
                        height: "10px",
                      }}
                    ></hr>
                    <div class="grid-container2">
                      <div class="grid-item2">
                        <p className="text2">ดูแบบบ้านในแต่ละโครงการ</p>

                        <div className="dropdown-input">
                          รูปแบบบ้าน
                          <select
                            style={{ width: "175px" }}
                            id="dropdown"
                            className="text"
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
                      <div class="grid-item2">
                        {" "}
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
                      <div class="grid-item2"></div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <hr
                  style={{
                    height: "10px",
                  }}
                ></hr>
                <div class="grid-container2">
                  <div class="grid-item2">
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
                  <div class="grid-item2">
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
                <hr
                  style={{
                    height: "10px",
                  }}
                ></hr>

                <div className="assign1-confirm-button" onClick={createProject}>
                  ยืนยันข้อมูล
                </div>
              </div>
            )}
            
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
                      style={{ width: "250px" }} // Set the width using inline CSS
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
                      style={{ width: "250px" }} // Set the width using inline CSS
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
                      style={{ width: "250px" }} // Set the width using inline CSS
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
                      style={{ width: "250px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
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
                    ></input>
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
               
                    ></input>
                  </div>
                </div>
                <hr
                  style={{
                    height: "20px",
                  }}
                ></hr>
                <Link to={`/user/${phone_number}`}>
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
