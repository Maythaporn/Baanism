import React from "react";
import "./login.css";
import Axios from "axios";

import logoIcon from "../../assets/images/logo_withbg.png";
import TextInput from "../../components/textinput/textinput.js";
import Button from "../../components/button/button.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const btnForgot = () => {
    navigate("/forgot"); // put ur page after  /
  };

  // const btnLogin = () => {
  //   Axios.post("http://localhost:3001/login", {
  //     phone_number: phoneNumber,
  //     password: password,
  //   })
  //     .then((response) => {
  //       if (response.data === "Invalid phone number or password") {
  //         alert(
  //           "เบอร์โทร หรือ รหัสผ่านท่านผิดกรุณาลองใหม่อีกครั้ง"
  //         );
  //       } else {
  //         // เข้าสู่ระบบสำเร็จ ตรวจสอบ token และ redirectTo จาก response.data
  //         const { token, redirectTo } = response.data;
  
  //         if (redirectTo === "/admin") {
  //           window.location.href = redirectTo;
  //           const role = "admin";
  //           localStorage.setItem('token', token);
  //           localStorage.setItem("role", role);
  //           localStorage.setItem("phone", phoneNumber)

  //         } else if (redirectTo === "/user") {
  //           navigate(`/user/${phoneNumber}`); 
  //           const role = "user";
  //           localStorage.setItem('token', token);
  //           localStorage.setItem("role", role);
  //           localStorage.setItem("phone", phoneNumber)

  //         } else if (redirectTo === "/changepassword") {
  //           alert("รหัสผ่านท่านมีอายุเกิน 90 วันแล้วกรุณาเปลี่ยน");
  //           window.location.href = redirectTo;

  //         } else {
  //           navigate(`/user_profile/${phoneNumber}`);
  //           const role = "user";
  //           localStorage.setItem('token', token);
  //           localStorage.setItem("role", role);
  //           localStorage.setItem("phone", phoneNumber)
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       alert("เกิดข้อผิดพลาดในการล็อกอิน: " + error.message)
  //     });
  // };

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
            const role = "admin";
            localStorage.setItem('token', token);
            localStorage.setItem("role", role);
            localStorage.setItem("phone", phoneNumber);
          } else if (redirectTo === "/user") {
            navigate(`/user/${phoneNumber}`);
            const role = "user";
            localStorage.setItem('token', token);
            localStorage.setItem("role", role);
            localStorage.setItem("phone", phoneNumber);
          } else if (redirectTo === "/changepassword") {
            alert("รหัสผ่านท่านมีอายุเกิน 90 วันแล้ว กรุณาเปลี่ยนรหัสผ่าน");
            window.location.href = redirectTo;
          } else {
            navigate(`/user_profile/${phoneNumber}`);
            const role = "user";
            localStorage.setItem('token', token);
            localStorage.setItem("role", role);
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
          <input
          className="password-input"
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
