import React from "react";
import "./login.css";
import Axios from "axios";

import logoIcon from "../../assets/images/logo_withbg.png";
import TextInput from "../../components/textinput/textinput.js";
import Button from "../../components/button/button.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const btnLogin = () => {
    Axios.post("http://localhost:3001/login", {
      phone_number: phoneNumber,
      password: password,
    })
      .then((response) => {
        if (response.data === "/admin") {
          window.location.href = "/admin"; // Redirect to the admin page
        } else if (response.data === "/user") {
          navigate(`/user/${phoneNumber}`); // Redirect to the user profile page with phone_number as a parameter
        } else {
          navigate(`/user_profile/${phoneNumber}`)
        }
      })
      .catch((error) => {
        alert("เบอร์โทรศัพท์ หรือ password ของท่านผิด");
      });
  };

  const btnForgot = () => {
    navigate("/forgot"); // put ur page after /
  };

  return (
    <div className="app">
      <div className="blue-box-login">
        {/* กล่องสีน้ำเงิน */}
        <img src={logoIcon} alt="ต่อเติมบ้าน" width="100" height="100" />
      </div>
      <div className="white-box-login">
        <h1 class="head-login">กรอกข้อมูลเข้าสู่ระบบ</h1>
        <div className="tel-input">
          <input
            placeholder="เบอร์โทรศัพท์"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="pass-input">
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/forgot">
          <button className="forgot-password-button" onClick={btnForgot}>
            ลืมรหัสผ่าน
          </button>
        </Link>
        <p>Your name: {phoneNumber + " " + password}</p>
        <div className="button-container">
          <button className="login-button" onClick={btnLogin}>
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
