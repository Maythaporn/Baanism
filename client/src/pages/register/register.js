import React from "react";
import "./register.css";
import Axios from "axios";

import logoIcon from "../../assets/images/logo_withbg.png";
import TextInput from "../../components/textinput/textinput.js";
// import Button from '../../components/button/button.js';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/button/button";

function Register() {
  const [firstName, setFirstName] = useState(""); // Initialize with an empty string
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  function checkPasswordStrength(password) {
    // กำหนด regular expressions เพื่อตรวจสอบเงื่อนไขต่างๆ
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    // คำนวณคะแนนตามเงื่อนไขที่ตรวจสอบ
    let score = 0;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;

    // กำหนดระดับความแข็งแรงของรหัสผ่านตามคะแนนที่ได้
    if (score === 4) {
      return "มีความแข็งแรง"; // ตรงทุกเงื่อนไข
    } else if (score >= 2) {
      return "ค่อนข้างแข็งแรง"; // ตรงบางเงื่อนไข
    } else {
      return "อ่อนแอ"; // ไม่ตรงเงื่อนไขเพียงพอ
    }
  }

  const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  const navigate = useNavigate();

  const [isTermsChecked, setIsTermsChecked] = useState(false); // State for checkbox

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

      // Show a success alert
      alert("กรุณาใส่ข้อมูลให้ครบถ้วน");
    } else if (password.length < 8) {
      // ตรวจสอบความยาวของรหัสผ่าน
      alert("รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร");
    } else if (!specialCharacters.test(password)) {
      // ตรวจสอบอักขระพิเศษในรหัสผ่าน
      alert("รหัสผ่านควรมีอักขระพิเศษอย่างน้อย 1 ตัว");
    } else {
      Axios.post("http://localhost:3001/createusers", {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        password: password,
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

            // Show a success alert
            alert("ทำการสมัครสมาชิกเรียบร้อยแล้ว");
            navigate('/login');

          }else if (response.status === 400) {
            // User added successfully
            alert("เบอร์โทรศัพท์ นี้ถูกใช้งานแล้ว");
          }
        })
        .catch((error, response) => {
          // Email already in use
          console.error("Phone number already in use");

          // Show an error alert
          alert("เบอร์โทรศัพท์ นี้ถูกใช้งานแล้ว");
        });
    }
  
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check if the passwords match
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if the passwords match
    setPasswordsMatch(e.target.value === password);
  };

  return (
    <div className="app">
      <div className="blue-box-register">
        {/* กล่องสีน้ำเงิน */}
        <img src={logoIcon} alt="ต่อเติมบ้าน" width="100" height="100" />
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
        <input
          type="password"
          className="pass-input"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={handlePasswordChange}
        ></input>
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
