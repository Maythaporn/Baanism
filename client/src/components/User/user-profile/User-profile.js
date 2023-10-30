import React, { useState, useEffect } from "react";
import "./User-profile.css"; // Import the CSS file for this component
import "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

import gallery3 from "../../../assets/images/gallery3.png";
import gallery4 from "../../../assets/images/gallery4.png";
import gallery5 from "../../../assets/images/gallery5.png";

import avatar1 from "../../../assets/images/avatar1.jpg";
import avatar2 from "../../../assets/images/avatar2.jpg";
import avatar3 from "../../../assets/images/avatar3.jpg";
import avatar4 from "../../../assets/images/avatar4.jpg";

import logo from "./../../../assets/images/logo-header.png";

import Thai_provinces from "../../../thai_provinces.js";
import Thai_district from "../../../thai_amphures.js";
import Thai_subdistrict from "../../../thai_tambons.js";

import {
  FaCamera,
  FaPlus,
  FaSignOutAlt,
  FaUserCircle,
  FaImage,
  FaRegCheckCircle,
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
  const [isProjectConfirm, setIsProjectConfirm] = useState(false);
  const [isProjectEditClicked, setIsProjectEditClicked] = useState(false);
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

  const handleTypeEditChange = (event) => {
    const project_type_edit = event.target.value;
    setproject_type(project_type_edit);

    // Check if the selected option is "อื่นๆ"
    if (project_type_edit === "") {
      // Show the additional field
      setisTypeNULLSelected(true);
    } else {
      // Hide the additional field
      setisTypeNULLSelected(false);
    }
  };

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [etc, setEtc] = useState("");

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

  const handleRoomEditChange = (event) => {
    const room_type_edit = event.target.value;
    setroom_type(room_type_edit);

    // Check if the selected option is "อื่นๆ"
    if (room_type_edit === "") {
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

    console.log("Status : " + Option);

    if (Option === "yes") {
      setSelectedDistrict(district);
      setSelectedProvince(provinces);
      setPostcode(zipcode);
      setAddress2(addressBackup);

      console.log("option provinces : " + provinces);
    } else if (Option === "no") {
      setAddress2("");
      setSelectedDistrict("");
      setSelectedProvince("");
      setPostcode("");
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

  const [addressBackup, setAddressBackup] = useState("");
  const [address2, setAddress2] = useState("");
  const [googlelink, setGoogleLink] = useState("");

  const [DateOption, setDateOption] = useState("");

  const [selectedDays, setSelectedDays] = useState([]); // Initialize an empty array for selected days
  const [selectedEditDays, setSelectedEditDays] = useState([]);

  const handleDateOptionChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add the value to the list when the checkbox is checked
      setSelectedDays([...selectedDays, value]);
    } else {
      // Remove the value from the list when the checkbox is unchecked
      setSelectedDays(selectedDays.filter((day) => day !== value));
    }
    console.log(selectedDays);
  };

  const handleDateEditOptionChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Ensure selectedEditDays is always an array
    const updatedSelectedEditDays = Array.isArray(selectedEditDays)
      ? [...selectedEditDays]
      : [];

    if (isChecked) {
      // Add the value to the list when the checkbox is checked
      updatedSelectedEditDays.push(value);
    } else {
      // Remove the value from the list when the checkbox is unchecked
      const index = updatedSelectedEditDays.indexOf(value);
      if (index !== -1) {
        updatedSelectedEditDays.splice(index, 1);
      }
    }

    setSelectedEditDays(updatedSelectedEditDays);
    console.log(updatedSelectedEditDays);
  };

  const [projectName, setprojectName] = useState("แสนสิริ");
  const [date, setDate] = useState("");
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

  const handleProjectEditChange = (event) => {
    const project_name_edit = event.target.value;
    setproject_name(project_name_edit);

    // Check if the selected option is "อื่นๆ"
    if (project_name_edit === "") {
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
    setIsProjectEditClicked(false);
    setIsProjectConfirm(false);
  };

  const handleProjectClick = () => {
    setIsProjectClicked(true);
    setIsPaymentClicked(false);
    setIsInfoClicked(false);
    setIsProjectCreateClicked(false);
    setIsProjectEditClicked(false);
    setIsProjectConfirm(false);
  };

  const handlePaymentClick = () => {
    setIsProjectClicked(false);
    setIsPaymentClicked(true);
    setIsInfoClicked(false);
    setIsProjectCreateClicked(false);
    setIsProjectEditClicked(false);
    setIsProjectConfirm(false);
  };

  const handleInfoClick = () => {
    setIsProjectClicked(false);
    setIsPaymentClicked(false);
    setIsInfoClicked(true);
    setIsProjectCreateClicked(false);
    setIsProjectEditClicked(false);
    setIsProjectConfirm(false);
  };

  const PDF = (id) => {
    window.location.href = `/document/${phoneNumber}/${id}`;
  };

  const Homepage = () => {
    window.location.href = `/user_profile/${phoneNumber}`;
  };

  const handleDeleteProject = (projectId) => {
    // Use window.confirm() to show a confirmation dialog
    const confirmation = window.confirm("คุณต้องการลบโครงการนี้ใช่หรือไม่?");

    // If the user confirms the deletion, proceed with the deletion process
    if (confirmation) {
      // Send an HTTP DELETE request to the server to delete the project.
      console.log(projectId);

      Axios.post("http://localhost:3001/delete-project", {
        projectId: projectId,
      })
        .then((response) => {
          if (response.status === 200) {
            alert("ลบโครงการเรียบร้อย");
            window.location.href = `/user_profile/${phoneNumber}`; // Redirect to the user profile page with phone_number as a parameter
          }
        })
        .catch((error) => {
          alert("เกิดข้อผิดพลากกรุณาลองใหม่อีกครั้ง");
        });
    }
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
      googlelink: googlelink,
      project_name: projectName,
      selectdate: selectedDays,
      date: date,
      start: start,
      end: end,
      etc: etc,
    })
      .then((response) => {
        if (response.status === 200) {
          setIsProjectConfirm(true);

          setIsProjectClicked(false);
          setIsPaymentClicked(false);
          setIsInfoClicked(false);
          setIsProjectCreateClicked(false);
          setIsProjectEditClicked(false);
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

  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.value;
    Axios.post("http://localhost:3001/updateImage", {
      phone_number: phoneNumber, // Make sure phoneNumber is defined
      img: selectedImage, // Send the binary image data
    })
      .then((response) => {
        if (response.status === 200) {
          alert("อัพเดตเรียบร้อยแล้ว");
        }
      })
      .catch((error) => {
        alert("เกิดข้อผิดพลากกรุณาลองใหม่อีกครั้ง");
      });

      if (selectedImage === "1") {
        setImage(avatar1);
        setAvatar("Boss");
        console.log(image);
      } else if (selectedImage=== "2") {
        setImage(avatar2);
        setAvatar("Woman");
        console.log(image);
      } else if (selectedImage === "3") {
        setImage(avatar3);
        setAvatar("Baby Boss");
        console.log(image);
      } else if (selectedImage === "4") {
        setImage(avatar4);
        setAvatar("Baby Girl");
        console.log(image);
      }
  };

  const [project_type_edit, setproject_type] = useState("");
  const [room_type_edit, setroom_type] = useState("");
  const [project_name_edit, setproject_name] = useState("");
  const [sq_meter_edit, setsq_meter] = useState("");
  const [start_date_edit, setstart_date] = useState("");
  const [starttime_edit, setstarttime] = useState("");
  const [endtime_edit, setendtime] = useState("");
  const [address_edit, setaddress] = useState("");
  const [etc_edit, setetc] = useState("");
  const [provinces_edit, setprovinces] = useState("");
  const [district_edit, setdistrict_edit] = useState("");
  const [subdistrict_edit, setsubdistrict] = useState("");
  const [zipcode_edit, setzipcode] = useState("");
  const [googlelink_edit, setGoogleLink_edit] = useState("");

  const [project_id, setproject_id] = useState("");
  const updateProject = (id) => {
    console.log(id);

    setproject_id(id);
    setIsProjectClicked(false);
    setIsPaymentClicked(false);
    setIsInfoClicked(false);
    setIsProjectCreateClicked(false);
    setIsProjectEditClicked(true);

    Axios.get("http://localhost:3001/projectID", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        const userData = response.data;
        console.log(userData);
        setproject_type(userData.project_type);
        setroom_type(userData.room_type);
        setproject_name(userData.project_name);
        setsq_meter(userData.sq_meter);
        setetc(userData.etc);
        setstart_date(userData.start_date);
        setaddress(userData.address);
        setprovinces(userData.provinces);
        setdistrict_edit(userData.district);
        setsubdistrict(userData.subdistrict);
        setzipcode(userData.zipcode);
        setGoogleLink_edit(userData.google_maps);
        setSelectedEditDays(userData.dayofavaliable);

        const parts = userData.timeofavaliable.split(" - ");
        setstarttime(parts[0]);
        console.log(starttime_edit);
        setendtime(parts[1]);
      })
      .catch((error) => {
        // Handle any network or server errors here
        console.error("Error fetching user data: ", error);
        // You might want to display a user-friendly error message to the user
      });
  };

  // เหลือเวลากับวัน

  const UPdateProject = () => {
    Axios.post("http://localhost:3001/updateProject", {
      project_type: project_type_edit,
      room_type: room_type_edit,
      address: address_edit,
      provinces: provinces_edit,
      district: district_edit,
      subdistrict: subdistrict_edit,
      sq_meter: sq_meter_edit,
      zipcode: zipcode_edit,
      googlelink: googlelink_edit,
      project_name: project_name_edit,
      selectdate: selectedEditDays,
      date: start_date_edit,
      start: starttime_edit,
      end: endtime_edit,
      etc: etc_edit,
      id: project_id,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("แก้ไขโครงการเรียบร้อยแล้ว");
          console.log(selectedEditDays);
          console.log(selectedDays);
          window.location.href = `/user_profile/${phoneNumber}`; // Redirect to the user profile page with phone_number as a parameter
        }
      })
      .catch((error) => {
        alert("เกิดข้อผิดพลากกรุณาลองใหม่อีกครั้ง");
      }); // put ur page after /
  };

  const logoButton = () => {
    navigate(`/user_profile/${phoneNumber}`);
    setIsProjectClicked(true);
    setIsPaymentClicked(false);
    setIsInfoClicked(false);
    setIsProjectCreateClicked(false);
  };

  useEffect(() => {
    console.log(selectedDays);
    console.log("Provinces : ", selectedProvince);
    console.log("Subdistrict : ", selectedSubDistrict);

    setProvince(Thai_provinces);
    setdistrict(Thai_district);
    setSubdistrict(Thai_subdistrict);

    Axios.get("http://localhost:3001/getuserImage", {
      params: {
        phone_number: phoneNumber,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.img === "1") {
          setImage(avatar1);
          setAvatar("Boss");
          console.log(image);
        } else if (response.data.img === "2") {
          setImage(avatar2);
          setAvatar("Woman");
          console.log(image);
        } else if (response.data.img === "3") {
          setImage(avatar3);
          setAvatar("Baby Boss");
          console.log(image);
        } else if (response.data.img === "4") {
          setImage(avatar4);
          setAvatar("Baby Girl");
          console.log(image);
        }
      })
      .catch((error) => {
        // Handle any network or server errors here
        console.error("Error fetching user data: ", error);
        // You might want to display a user-friendly error message to the user
      });

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
        setAddressBackup(userData.address);
        setProvinces(userData.provinces);
        setDistrict(userData.district);
        setZipcode(userData.zipcode);
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
      <div
        className={`projectUsercontainer ${isMobile ? "mobile" : "desktop"}`}
      >
        <div className="MimprojectUsercontainer">
          <div className="project-sidebar">
            <br />
            {image ? (
              <img src={image} alt="User" className="img-circle" />
            ) : (
              <div>
                <FaUserCircle
                  size={isMobile ? 70 : 70}
                  color="gray"
                  className="user-icon"
                />
              </div>
            )}

            <div className="profile-graps"></div>
            <div className="dropdown-inputProfile">
              <select
                style={{ width: "190px",height:"30px", borderColor:"#038E7F",color:"#000000",marginTop:"1px",borderRadius:"10px",marginLeft:"3px"}}
                id="dropdown"
                className="text"
                onChange={handleImageChange}
              > 
                <option value="1" className="text">
                  Boss
                </option>
                <option value="2" className="text">
                  Woman
                </option>
                <option value="3" className="text">
                  Baby Boss
                </option>
                <option value="4" className="text">
                  Baby Girl
                </option>
              </select>
            </div>

            <br />
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
              <Link to="/">
                <div onClick={handleInfoClick} className={"Userbutton"}>
                  <FaSignOutAlt
                    size={isMobile ? 10 : 17}
                    color={"grey"}
                    className="button-icon"
                  />{" "}
                  <p className="profile-graps">ออกจากระบบ</p>
                </div>
              </Link>
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
                {project && project.length > 0 ? (
                  project.map((e) => (
                    <div className="user-project-container" key={e.id}>
                      <div className="userinfo-left">
                        <p className="project-title">{e.project_type}</p>
                        <p>ประเภทห้อง : {e.room_type}</p>
                        <p>สถานที่ : {e.address}</p>
                      </div>
                      <div className="userinfo-right">
                        <p>สถานะ : {e.status}</p>
                        <div className="edit">
                          <button
                            className="edit-btn"
                            onClick={() => updateProject(e.id)}
                          >
                            แก้ไขข้อมูล
                          </button>
                          <span className="space">|</span>
                          <button
                            className="edit-btn"
                            onClick={() => PDF(e.id)}
                          >
                            ดูใบงานโครงการ
                          </button>
                          <span className="space">|</span>
                          <button
                            className="edit-btn"
                            onClick={() => handleDeleteProject(e.id)}
                          >
                            ลบโครงการ
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <br />
                    <br />
                    <p>ไม่มีโครงการของท่าน</p>
                  </>
                )}
              </div>
            )}
            {isPaymentClicked && <div>Payment content</div>}
            {isProjectConfirm && (
              <div>
                <br></br>
                <div className="confirm_contain">
                  ได้รับข้อมูลของท่านเรียบร้อยแล้ว
                  <FaRegCheckCircle
                    size={40}
                    color={"black"}
                    className="icon-space"
                  />
                </div>
                <br></br>
                <div className="confirm_contain">
                  <p>
                    ทาง Baanism จะรีบติดต่อกลับท่านอย่างรวดเร็วที่สุด
                    ขอขอบคุณที่เลือกใช้บริการกับทางเรา!
                  </p>
                </div>
                <div className="confiRmbutton" onClick={Homepage}>
                  กลับสู่หน้าหลัก
                </div>
              </div>
            )}
            {isProjectCreateClicked && (
              <div
                style={{ height: "500px", width: "910px", overflow: "scroll" }}
              >
                <h1 className="titletext">สร้างโครงการ</h1>
                <hr
                  style={{
                    height: "10px",
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
                          onClick={handleOptionChange}
                        />{" "}
                        สถานที่เดียวกันกับที่ลงทะเบียน
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="options"
                          value="no"
                          checked={Option === "no"}
                          onClick={handleOptionChange}
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
                    <div className="align">
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
                      <hr
                        style={{
                          height: "10px",
                        }}
                      ></hr>
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
                          {/* Default empty option */}{" "}
                          {subdistrict
                            .filter((state) => {
                              const districtIds = District.filter(
                                (district_id) =>
                                  district_id.name_th === selectedDistrict
                              ).map((district_id) => district_id.id);
                              return districtIds.includes(state.amphure_id);
                            })
                            .map((state) => (
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
                        style={{
                          width: isMobile ? "300px" : "385px",
                          height: "100px",
                        }}
                        className="text"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
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
                        <label
                          htmlFor="fileInput"
                          style={{ alignItems: "center"}}
                        >
                          <FaImage
                            size={30}
                            color="black"
                            className="camera-icon"
                            style={{ cursor: "pointer", margin:"0 0 -10px 0" }}
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
                  <div class="grid-item" style={{border:"0px solid green"}}>
                    <div className="linkgoogleInput ">
                      Link Google Maps
                      <input
                        style={{
                          width: isMobile ? "250px" : "380px",
                          height: "100px",
                          border: "0px solid red"
                        }}
                        className="text"
                        type="text"
                        value={googlelink}
                        onChange={(e) => setGoogleLink(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="grid-item">
                    <div style={{height:"72px"}}
                      className={`dropdown-input${
                        isProjectNameNULLSelected ? "-expanded" : ""
                      }`}
                    >
                      ชื่อโครงการที่อยู่อาศัย
                      {/* <br /> */}
                      <select
                        style={{ width: "175px", border:"1px solid blue" }}
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
                  {/* <div class="grid-item">
                    <div className="linkgoogleInput ">
                      Link Google Maps
                      <input
                        style={{
                          width: isMobile ? "250px" : "380px",
                          height: "100px",
                        }}
                        className="text"
                        type="text"
                        value={googlelink}
                        onChange={(e) => setGoogleLink(e.target.value)}
                      />
                    </div>
                  </div> */}
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                      <div className="align">
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันจันทร์"
                            checked={selectedDays.includes("วันจันทร์")}
                            onChange={handleDateOptionChange}
                          />{" "}
                          จันทร์{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันอังคาร"
                            checked={selectedDays.includes("วันอังคาร")}
                            onChange={handleDateOptionChange}
                          />{" "}
                          อังคาร{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันพุธ"
                            checked={selectedDays.includes("วันพุธ")}
                            onChange={handleDateOptionChange}
                          />{" "}
                          พุธ{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันพฤหัสบดี"
                            checked={selectedDays.includes("วันพฤหัสบดี")}
                            onChange={handleDateOptionChange}
                          />{" "}
                          พฤหัสบดี{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันศุกร์"
                            checked={selectedDays.includes("วันศุกร์")}
                            onChange={handleDateOptionChange}
                          />{" "}
                          ศุกร์{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันเสาร์"
                            checked={selectedDays.includes("วันเสาร์")}
                            onChange={handleDateOptionChange}
                          />{" "}
                          เสาร์{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันอาทิตย์"
                            checked={selectedDays.includes("วันอาทิตย์")}
                            onChange={handleDateOptionChange}
                          />{" "}
                          อาทิตย์
                        </div>
                      </div>
                      <div>
                        เวลา : {"  "}
                        <input
                          type="time"
                          style={{ width: "110px" }}
                          className="text"
                          value={start}
                          onChange={(e) => setStart(e.target.value)}

                          // Handle checkbox change event
                        />
                        {"    "} ถึง {"     "}
                        <input
                          style={{ width: "100px" }}
                          type="time"
                          className="text"
                          value={end}
                          onChange={(e) => setEnd(e.target.value)}

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
                            style={{ cursor: "pointer", margin:"0 0 -10px 0" }}
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
                        style={{
                          width: isMobile ? "250px" : "385px",
                          height: "100px",
                        }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                        className="text"
                        value={etc}
                        onChange={(e) => setEtc(e.target.value)}
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
            {isProjectEditClicked && (
              <div
                style={{ height: "500px", width: "910px", overflow: "scroll" }}
              >
                <h1 className="titletext">แก้ไขโครงการ</h1>
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
                        value={project_type_edit}
                        onChange={handleTypeEditChange}
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
                            value={project_type_edit}
                            onChange={(e) => setproject_type(e.target.value)}
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
                        value={room_type_edit}
                        onChange={handleRoomEditChange}
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
                            value={room_type_edit}
                            onChange={(e) => setroom_type(e.target.value)}
                          />
                        </div>
                      )}
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
                        value={sq_meter_edit}
                        onChange={(e) => setsq_meter(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="grid-item"></div>
                  <div class="grid-item">
                    {" "}
                    <div className="text-input-provinces">
                      จังหวัด
                      <select
                        style={{ width: "250px" }}
                        id="dropdownProvinces"
                        className="text"
                        value={provinces_edit} // The selected province is bound to the value of the select element
                        onChange={(e) => setprovinces(e.target.value)} // This function will be called when the selection changes
                      >
                        {/* Default empty option */}
                        {province.map((state) => (
                          <option key={state.id} value={state.name_th}>
                            {state.name_th}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div class="grid-item">
                    <hr
                      style={{
                        height: "10px",
                      }}
                    ></hr>
                    <div className="align">
                      <div className="dropdown-input">
                        เขต/อำเภอ
                        <br />
                        <select
                          style={{ width: "175px" }}
                          id="dropdownDistrict"
                          className="text"
                          value={district_edit}
                          onChange={(e) => setdistrict_edit(e.target.value)}
                        >
                          {" "}
                          {District.filter((state) => {
                            const provinceIds = province
                              .filter(
                                (province_id) =>
                                  province_id.name_th === provinces_edit
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
                      <hr
                        style={{
                          height: "10px",
                        }}
                      ></hr>
                      <div className="dropdown-input">
                        แขวง/ตำบล
                        <br />
                        <select
                          style={{ width: "175px" }}
                          id="dropdown"
                          className="text"
                          value={subdistrict_edit}
                          onChange={(e) => setsubdistrict(e.target.value)}
                        >
                          {/* Default empty option */}{" "}
                          {subdistrict
                            .filter((state) => {
                              const districtIds = District.filter(
                                (district_id) =>
                                  district_id.name_th === district_edit
                              ).map((district_id) => district_id.id);
                              return districtIds.includes(state.amphure_id);
                            })
                            .map((state) => (
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
                        style={{
                          width: isMobile ? "300px" : "385px",
                          height: "100px",
                        }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                        className="text"
                        value={address_edit}
                        onChange={(e) => setaddress(e.target.value)}
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
                        value={zipcode_edit}
                        onChange={(e) => setzipcode(e.target.value)}
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
                        <label
                          htmlFor="fileInput"
                          style={{ alignItems: "center", marginInline: 10 }}
                        >
                          <FaImage
                            size={30}
                            color="black"
                            className="camera-icon"
                            style={{ cursor: "pointer", margin:"0 0 -10px 0" }}
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
                  <hr
                    style={{
                      height: "50px",
                    }}
                  ></hr>
                  <div class="grid-item">
                    <div
                      className={`dropdown-input${
                        isProjectNameNULLSelected ? "-expanded" : ""
                      }`}
                    >
                      ชื่อโครงการที่อยู่อาศัย
                      {/* <br /> */}
                      <select
                        style={{ width: "175px" }}
                        id="dropdown"
                        className="text"
                        value={project_name_edit}
                        onChange={handleProjectEditChange}
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
                            value={project_name_edit}
                            onChange={(e) => setproject_name(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="grid-item">
                    <div className="linkgoogleInput ">
                      Link Google Maps
                      <input
                        style={{
                          width: isMobile ? "250px" : "380px",
                          height: "100px",
                        }} // Set the width using inline CSS
                        className="text"
                        type="text"
                        value={googlelink_edit}
                        onChange={(e) => setGoogleLink_edit(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    height: "60px",
                  }}
                ></hr>
                <div className="new4"></div>
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
                        value={start_date_edit}
                        onChange={(e) => setstart_date(e.target.value)}
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
                      <div className="align">
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันจันทร์"
                            checked={selectedEditDays.includes("วันจันทร์")}
                            onChange={handleDateEditOptionChange}
                          />{" "}
                          จันทร์{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันอังคาร"
                            checked={selectedEditDays.includes("วันอังคาร")}
                            onChange={handleDateEditOptionChange}
                          />{" "}
                          อังคาร{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันพุธ"
                            checked={selectedEditDays.includes("วันพุธ")}
                            onChange={handleDateEditOptionChange}
                          />{" "}
                          พุธ{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันพฤหัสบดี"
                            checked={selectedEditDays.includes("วันพฤหัสบดี")}
                            onChange={handleDateEditOptionChange}
                          />{" "}
                          พฤหัสบดี{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันศุกร์"
                            checked={selectedEditDays.includes("วันศุกร์")}
                            onChange={handleDateEditOptionChange}
                          />{" "}
                          ศุกร์{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันเสาร์"
                            checked={selectedEditDays.includes("วันเสาร์")}
                            onChange={handleDateEditOptionChange}
                          />{" "}
                          เสาร์{" "}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="options"
                            value="วันอาทิตย์"
                            checked={selectedEditDays.includes("วันอาทิตย์")}
                            onChange={handleDateEditOptionChange}
                          />{" "}
                          อาทิตย์
                        </div>
                      </div>
                      <div>
                        เวลา : {"  "}
                        <input
                          type="time"
                          style={{ width: "110px" }}
                          className="text"
                          value={starttime_edit}
                          onChange={(e) => setstarttime(e.target.value)}

                          // Handle checkbox change event
                        />
                        {"    "} ถึง {"     "}
                        <input
                          style={{ width: "100px" }}
                          type="time"
                          className="text"
                          value={endtime_edit}
                          onChange={(e) => setendtime(e.target.value)}

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
                          showArrows={true}
                          showThumbs={false}
                          infiniteLoop={true}
                          autoPlay={true}
                          interval={5000}
                          style={{
                            width: isMobile ? "200px" : "100%", // Adjust the width based on your requirements
                            margin: "0 auto", // Center the carousel
                          }}
                        >
                          <div>
                            <img
                              src={gallery3}
                              style={{
                                width: isMobile ? "200px" : "100%", // Adjust the width based on your requirements
                                margin: "0 auto", // Center the carousel
                              }}
                              alt="Image 1"
                            />
                            <p className="legend">Caption for Image 1</p>
                          </div>
                          <div>
                            <img
                              src={gallery5}
                              style={{
                                width: isMobile ? "200px" : "100%", // Adjust the width based on your requirements
                                margin: "0 auto", // Center the carousel
                              }}
                              alt="Image 2"
                            />
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
                            style={{ cursor: "pointer", margin:"0 0 -10px 0" }}
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
                        style={{
                          width: isMobile ? "250px" : "385px",
                          height: "100px",
                        }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                        className="text"
                        value={etc_edit}
                        onChange={(e) => setetc(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    height: "10px",
                  }}
                ></hr>

                <div className="assign1-confirm-button" onClick={UPdateProject}>
                  ยืนยันข้อมูล
                </div>
              </div>
            )}

            {isInfoClicked && (
              <div style={{ height: "500px", overflow: "scroll" }}>
                <h1 className="titleConfirm">ข้อมูลผู้ใช้งาน</h1>
                <hr
                  style={{
                    height: "10px",
                  }}
                ></hr>

                <div className="profile-gridHvan">
                  <div className="text-inputHvan">
                    ชื่อจริง
                    <input
                      style={{ width: isMobile ? "170px" : "250px" }} // Set the width using inline CSS
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
                      style={{ width: isMobile ? "170px" : "250px" }} // Set the width using inline CSS
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
                      style={{ width: isMobile ? "170px" : "250px" }} // Set the width using inline CSS
                      className="text"
                      type="text"
                      placeholder={phone_number}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="address-inputHvan">
                    ที่อยู่
                    <input
                      style={{ width: isMobile ? "170px" : "250px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                      className="text"
                      placeholder={address}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="text-input-provincesHvan">
                    จังหวัด
                    <input
                      style={{ width: isMobile ? "170px" : "250px" }}
                      id="dropdownProvincs"
                      className="text"
                      placeholder={provinces}
                    ></input>
                  </div>

                  <div className="zip-inputHvan">
                    รหัสไปรษณีย์
                    <input
                      style={{ width: isMobile ? "170px" : "250px" }} // Set the width using inline CSS
                      className="text"
                      type="text"
                      placeholder={zipcode}
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
                    ></input>
                  </div>
                </div>
                <hr
                  style={{
                    height: "20px",
                  }}
                ></hr>
                <Link to={`/user/${phone_number}`}>
                  <div className="assign1-confirm-button">แก้ไขข้อมูล</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
