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

          }else if (response.status === 400) {
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
