import React from "react";
import "./login.css";
import Axios from "axios";

import logoIcon from "../../assets/images/logo_withbg.png";
import TextInput from "../../components/textinput/textinput.js";
import Button from "../../components/button/button.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  let loginAttempts = 1;

  let timeLeft = 10; // Initial time left
  

  const startCountdown = () => {
    const countdownInterval = setInterval(() => {
      if (timeLeft <= 0) {
        // Reset login attempts and clear the interval when the countdown ends
        clearInterval(countdownInterval);
        loginAttempts = 0;
      } else {
        // Display the countdown alert to the user
        console.log("Time left: " + timeLeft);
        timeLeft--;
      }
    }, 1000); // Update the countdown every 1 second
  };

  const btnLogin = () => {
    if (loginAttempts >= 5) {
      alert(
        "เบอร์โทร หรือ รหัสผ่านท่านผิดกรุณาลองใหม่อีกครั้ง ท่านสามารถลองได้อีกครั้งใน 10 วินาที."
      );
      startCountdown(); // Start the countdown timer
    }
  
    Axios.post("http://localhost:3001/login", {
      phone_number: phoneNumber,
      password: password,
    })
      .then((response) => {
        if (response.data === "Invalid phone number or password") {
          loginAttempts++; // Increment login attempts on failed login
          console.log("Login : " + loginAttempts);
          alert(
            "เบอร์โทร หรือ รหัสผ่านท่านผิดกรุณาลองใหม่อีกครั้ง ท่านสามารถลองได้อีก : " +
              (5 - loginAttempts) +
              " ครั้ง"
          );
        } else if (response.data === "/admin") {
          window.location.href = "/admin"; // Redirect to the admin page
        } else if (response.data === "/changepassword") {
          alert("รหัสผ่านท่านมีอายุเกิน 90 วันแล้วกรุณาเปลี่ยน");
          window.location.href = "/forgot";
        } else if (response.data === "/user") {
          navigate(`/user/${phoneNumber}`);
        } else {
          navigate(`/user_profile/${phoneNumber}`);
        }
      })
      .catch((error) => {
        if (loginAttempts > 5) {
          loginAttempts = 5; // Limit login attempts to 5
        }
      
        alert(
          "เบอร์โทร หรือ รหัสผ่านท่านผิดกรุณาลองใหม่อีกครั้ง ท่านสามารถลองได้อีก : " +
            (5 - loginAttempts) +
            " ครั้ง"
        );
      
        loginAttempts++;
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
