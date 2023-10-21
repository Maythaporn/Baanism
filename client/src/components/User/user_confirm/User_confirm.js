import React, { useState, useEffect } from "react";
import "./Confirm.css"; // Import the CSS file for this component
import "react-icons/fa";
import Axios from "axios";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { View, TextInput, onChangeText, onChangeNumber } from "react";

import { FaCamera, FaUserCircle } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";

import Thai_provinces from "../../../thai_provinces.js";
import Thai_district from "../../../thai_amphures.js";

function Confirm(props) {
  const [userData, setUserData] = useState({});
  const { phone_number } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(phone_number);
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [provinces, setProvinces] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [province, setProvince] = useState([]); // Use an array for provinces
  const [District, setdistrict] = useState([]);

  //เมื่อกด side bar จะเลือก case มาแสดงผล
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

  const btnProfile = () => {
    Axios.post("http://localhost:3001/adduserinfo", {
      address: address,
      provinces: provinces,
      district: district,
      zipcode: zipcode,
      phone_number: phoneNumber,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("ยืนยันข้อมูลผู้ใช้งานเรียบร้อย");
          navigate(`/user_profile/${phoneNumber}`); // Redirect to the user profile page with phone_number as a parameter
        }
      })
      .catch((error) => {
        alert("เกิดข้อผิดพลากกรุณาลองใหม่อีกครั้ง");
      }); // put ur page after /
  };
  // const [setName, onChangeNumber] = React.useState('');

  useEffect(() => {
    setProvince(Thai_provinces);
    setdistrict(Thai_district);

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
  return (
    <div className={`UserContainer ${isMobile ? "mobile" : "desktop"}`}>
      <div className="Profilebar">
        <h1 className="headText">ยืนยันข้อมูลผู้ใช้งาน</h1>
        <div className="Input-container">
          {/* <label htmlFor="name" className="required-label">*</label> */}
          <input
            id="name"
            type="text"
            className="ConfirmInput-info"
            placeholder={firstname}
          />

          {/* <label htmlFor="surename" className="required-label">*</label> */}
          <input
            type="text"
            id="surename"
            className="ConfirmInput-info"
            placeholder={lastname}
          />

          {/* <label htmlFor="phonenumber" className="required-label">*</label> */}
          <input
            id="phonenumber"
            type="text"
            className="ConfirmInput-info"
            placeholder={phoneNumber}
            keyboardType="numeric"
          />

          {/* <label htmlFor="address" className="required-label">*</label> */}
          <input
            type="text"
            id="address"
            className="AddressInput-info"
            placeholder="ที่อยู่"
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* <label htmlFor="province" className="required-label">*</label> */}
          <div className="custom-dropdown">
            <select
              className="ConfirmInput-info "
              value={provinces}
              onChange={(e) => setProvinces(e.target.value)}
              id="province"
            >
              <option value="" disabled selected>
                จังหวัด
              </option>
              <option value="">กรุณาเลือก</option> {/* Default empty option */}
              {province.map((state) => (
                <option key={state.id} value={state.name_th}>
                  {state.name_th}
                </option>
              ))}
            </select>
          </div>

          {/* <label htmlFor="code" className="required-label">*</label> */}
          <input
            type="text"
            id="code"
            className="ConfirmInput-info"
            placeholder="รหัสไปรษณีย์"
            onChange={(e) => setZipcode(e.target.value)}
          />

          {/* <label htmlFor="county" className="required-label">*</label> */}
          <div className="custom-dropdown">
            <select
              className="ConfirmInput-info "
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              id="county"
              required
            >
              <option value="" disabled selected>
                เขต/อำเภอ
              </option>{" "}
              {District.filter((state) => {
                            const provinceIds = province
                              .filter(
                                (province_id) =>
                                  province_id.name_th === provinces
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
        </div>
        <Link to="/user_profile">
          <button className="setInfoButton" onClick={btnProfile}>
            ยืนยันข้อมูล
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Confirm;
