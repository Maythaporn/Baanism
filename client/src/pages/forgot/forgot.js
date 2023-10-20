import React from "react";
import "./forgot.css";
import logoIcon from "../../assets/images/logo_withbg.png";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Device } from "twilio-client";
function Forgot() {
  const client = new Device(
    "AC5fac57ff49e4ac6a98379b5e05f24e2f",
    "21f1038fc25aec09787205333b2b9082"
  );
  const navigate = useNavigate();

  const [isreset, setIsresetClicked] = useState(true);
  const [isOtpCreateClicked, setIsOtpCreateClicked] = useState(false);
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;


  const handleResetClick = () => {
    setIsConfirmClicked(false);

    Axios.post("http://localhost:3001/checkAccount", {
      phone_number: phoneNumber,
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Unauthorized: เบอร์โทรศัพท์ หรือ password ของท่านผิด");
        } else if (response.data === "/found") {
          setIsresetClicked(false);
          setIsOtpCreateClicked(true);
        } else {
          alert("เกิดข้อผิดพลาด");
          setIsresetClicked(false);
        }
      })
      .catch((error) => {
        alert("ไม่มีบัญชีนี้อยู่่");
        navigate("/forgot");
      });
  };

  const handleOTPClick = () => {
    setIsresetClicked(false);
    setIsOtpCreateClicked(false);

    Axios.post("http://localhost:3001/checkEmail", {
      email: email,
      phone_number: phoneNumber,
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Unauthorized: ท่านอาจจะไม่ใช่เจ้าของบัญชีนี้");

          Axios.post("http://localhost:3001/resetpassword", {
            phone_number: phoneNumber,
            password: "password",
          })
            .then((response) => {
              if (response.status === 200) {
                alert("เปลี่ยนรหัสผ่านเรียบร้อย");
                navigate("/");
              }
            })
            .catch((error, response) => {
              // Email already in use
              console.error("Phone number already in use");
            });
        } else if (response.status === 200) {
          setIsConfirmClicked(true);
        }
      })
      .catch((error) => {
        alert("ไม่มีบัญชีนี้อยู่่");
        Axios.post("http://localhost:3001/resetpassword", {
          phone_number: phoneNumber,
          password: "password",
        })
          .then((response) => {
            if (response.status === 200) {
              alert("เปลี่ยนรหัสผ่านเรียบร้อย");
              navigate("/");
            }
          })
          .catch((error, response) => {
            // Email already in use
            console.error("Phone number already in use");
          });
      });
  };

  const btnConfirm = () => {
    if (password === "" || confirmPassword === "") {
      alert("โปรดกรอกรหัสผ่าน");
    } else if (!passwordsMatch) {
      alert("รหัสผ่านไม่ตรงกันกรุณาตรวจสอบอีกครั้ง");
    } else if (password.length < 8) {
        // ตรวจสอบความยาวของรหัสผ่าน
        alert("รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร");
    } else if (!specialCharacters.test(password)) {
        // ตรวจสอบอักขระพิเศษในรหัสผ่าน
        alert("รหัสผ่านควรมีอักขระพิเศษอย่างน้อย 1 ตัว");
    } else {
      Axios.post("http://localhost:3001/resetpassword", {
        phone_number: phoneNumber,
        password: password,
      })
        .then((response) => {
          if (response.status === 200) {
            alert("เปลี่ยนรหัสผ่านเรียบร้อย");
            navigate("/login");
          } else if (response.status === 400) {
            // User added successfully
            alert("เกิดข้อผิดพลาด");
          }
        })
        .catch((error, response) => {
          // Email already in use
          console.error("Phone number already in use");

          // Show an error alert
          alert("เกิดข้อผิดพลาด");
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
      <div className="blue-box-forgot">
        {/* กล่องสีน้ำเงิน */}
        <img src={logoIcon} alt="ต่อเติมบ้าน" width="100" height="100" />
      </div>
      <div className="white-box-forgot">
        {isreset && (
          <div>
            <p class="head-text">สร้างรหัสผ่านใหม่</p>
            <p class="content-text">กรุณากรอกหมายเลขโทรศัพท์</p>

            <br></br>
            <input
              type="text"
              className="pass-input"
              placeholder="เบอร์โทรศัพท์"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>

            <br></br>
            <br></br>
            <button
              className="resetPasswordButtonPeng"
              onClick={handleResetClick}
            >
              รีเซตรหัสผ่าน
            </button>
          </div>
        )}
        {isOtpCreateClicked && (
          <div>
            <p class="head-text">สร้างรหัสผ่านใหม่</p>
            <p class="content-text">กรุณากรอก Email เพื่อยืนยัน</p>

            <br></br>
            <input
              type="text"
              className="pass-input"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br></br>
            <br></br>
            <button
              className="resetPasswordButtonPeng"
              onClick={handleOTPClick}
            >
              ยืนยัน
            </button>
          </div>
        )}{" "}
        {isConfirmClicked && (
          <div>
            <p class="head-text">สร้างรหัสผ่านใหม่</p>

            <br></br>

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
            <br></br>
            <br></br>
            <button className="resetPasswordButtonPeng" onClick={btnConfirm}>
              ยืนยัน
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forgot;
