import React from "react";
import "./register.css";
import Axios from "axios";

import logoIcon from "../../assets/images/logo_withbg.png";
import logoMobile from "../../assets/images/logo-header.png";
import TextInput from "../../components/textinput/textinput.js";
// import Button from '../../components/button/button.js';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/button/button";

function Register() {

  const navigate = useNavigate();

  // Initialize with an empty string
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  //State for checkbox
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  const btnConfirm = () => {
    if (!isTermsChecked) {
      alert("โปรดยอมรับข้อกำหนดและเงื่อนไขก่อนการสมัครสมาชิก");
      return;
    } else if (!passwordsMatch) {
      alert("รหัสผ่านไม่ตรงกันกรุณาตรวจสอบอีกครั้ง");
    } else if (
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      email === "" ||
      password === ""
    ) {
      // User added successfully
      console.log("User added successfully");
      console.log("value :" + firstName);
      console.log("value :" + lastName);
      console.log("value :" + phoneNumber);
      console.log("value :" + email);
      console.log("value :" + password);

    } else if (password.length < 8) {
      alert("รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร");

    } else if (!specialCharacters.test(password)) {
      alert("รหัสผ่านควรมีอักขระพิเศษอย่างน้อย 1 ตัว");

    } else {
      Axios.post("http://localhost:3001/createusers", {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        password: password,
        role: "user"
      })
        .then((response) => {
          if (response.status === 200) {
            // User added successfully
            console.log("User added successfully");
            console.log("value :" + firstName);
            console.log("value :" + lastName);
            console.log("value :" + phoneNumber);
            console.log("value :" + email);
            console.log("value :" + password);
            alert("ทำการสมัครสมาชิกเรียบร้อยแล้ว");
            navigate('/login');

          } else if (response.status === 400) {
            alert("เบอร์โทรศัพท์ นี้ถูกใช้งานแล้ว");
          }
        })
        .catch((error, response) => {
          // Email already in use
          console.error("Phone number already in use");
          alert("เบอร์โทรศัพท์ นี้ถูกใช้งานแล้ว");
        });
    }
  };

  // Check if the passwords match
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const [showPassword, setShowPassword] = useState(false); // เพิ่มสถานะ showPassword

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="app">
      <div className="blue-box-register">
        {/* กล่องสีน้ำเงิน */}
        <img src={logoIcon} alt="ต่อเติมบ้าน" className="logo-pc-register" />
        <img src={logoMobile} alt="ต่อเติมบ้าน" className="logo-mb-register" />
      </div>
      <div className="white-box-register">
        <h1 className="head-register">สมัครสมาชิก</h1>
        <input
          type="text"
          className="name-input"
          placeholder="ชื่อจริง"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          type="text"
          className="surname-input"
          placeholder="นามสกุล"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <input
          type="text"
          className="tele-input"
          placeholder="เบอร์โทรศัพท์"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
        <input
          type="text"
          className="email-input"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>




        {/* <div className="password-input-container">
          <input
            className="password-input"
            type={showPassword ? "text" : "password"}
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {password.length > 0 && (
            <button
              className="show-password-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <i className="material-icons">visibility</i> : <i className="material-icons">visibility_off</i>}
            </button>
          )}
        </div>
        <div className="password-input-container">
          <input
            className="password-input"
            type={showPassword ? "text" : "password"}
            placeholder="ยืนยันรหัสผ่าน"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          />
          {password.length > 0 && (
            <button
              className="show-password-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <i className="material-icons">visibility</i> : <i className="material-icons">visibility_off</i>}
            </button>
          )}
        </div> */}



        <div className="password-input-container">
          <input
            className="password-input-register"
            type={showPassword ? "text" : "password"}
            placeholder="รหัสผ่าน"
            value={password}
            onChange={handlePasswordChange}
          />
          {password.length > 0 && (
            <button
              className="show-password-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <i className="material-icons">visibility</i> : <i className="material-icons">visibility_off</i>}
            </button>
          )}
        </div>
        <input
          type="password"
          className="confirm-pass-input"
          placeholder="ยืนยันรหัสผ่าน"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        ></input>
        <div className="terms-condition">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={isTermsChecked}
            onChange={(e) => setIsTermsChecked(e.target.checked)}
            required
          />
          <div className="terms-text">
            <label htmlFor="terms">ข้อกำหนดและเงื่อนไข</label>
          </div>
        </div>
        <button className="confirm-button" onClick={btnConfirm}>
          สมัครสมาชิก
        </button>
      </div>
    </div>
  );
}

export default Register;
