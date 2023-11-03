import React from "react";
import "./login.css";
import Axios from "axios";

import logoIcon from "../../assets/images/logo_withbg.png";
import TextInput from "../../components/textinput/textinput.js";
import Button from "../../components/button/button.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {

  const [showPassword, setShowPassword] = useState(false); // เพิ่มสถานะ showPassword

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const btnForgot = () => {
    navigate("/forgot"); // put ur page after  /
  };

  const btnLogin = () => {
    Axios.post("http://localhost:3001/login", {
      phone_number: phoneNumber,
      password: password,
    })
      .then((response) => {
        if (response.status === 200) {
          // ล็อกอินสำเร็จ
          const { token, redirectTo } = response.data;

          if (redirectTo === "/admin") {
            window.location.href = redirectTo;
            localStorage.setItem('role', 'admin');
            localStorage.setItem('token', token);
            localStorage.setItem("phone", phoneNumber);
          } else if (redirectTo === "/user") {
            navigate(`/user/${phoneNumber}`);
            localStorage.setItem('role', 'user');
            localStorage.setItem('token', token);
            localStorage.setItem("phone", phoneNumber);
          } else if (redirectTo === "/changepassword") {
            alert("รหัสผ่านท่านมีอายุเกิน 90 วันแล้ว กรุณาเปลี่ยนรหัสผ่าน");
            window.location.href = redirectTo;
          } else {
            navigate(`/user_profile/${phoneNumber}`);
            localStorage.setItem('role', 'user');
            localStorage.setItem('token', token);
            localStorage.setItem("phone", phoneNumber);
          }
        } else {
          // ล็อกอินไม่สำเร็จ
          alert("เบอร์โทรหรือรหัสผ่านของคุณไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการล็อกอิน:", error);
        alert("เบอร์โทรหรือรหัสผ่านของคุณไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      });
  };


  return (
    <div className="app">
      <div className="blue-box-login">
        {/* กล่องสีน้ำเงิน */}
        <img src={logoIcon} alt="ต่อเติมบ้าน" width="100" height="100" />
      </div>
      <div className="white-box-login">
        <h1 class="head-login">กรอกข้อมูลเข้าสู่ระบบ</h1>
        <input
          className="tel-input"
          placeholder="เบอร์โทรศัพท์"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />


        <div className="password-input-container">
          <input
            className="password-input"
            type={showPassword ? "text" : "password"}
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <button className="forgot-password-button" onClick={btnForgot}>
          ลืมรหัสผ่าน
        </button>
        <div>
          <div className="button-container">
            <button className="login-button" onClick={btnLogin}>
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
