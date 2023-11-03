import React from "react";
import "./forgot.css";
import logoIcon from "../../assets/images/logo_withbg.png";
import logoMobile from "../../assets/images/logo-header.png";
import Axios from "axios";
import emailjs from 'emailjs-com'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Forgot() {
  const navigate = useNavigate();



  //page state
  const [isreset, setIsresetClicked] = useState(true);
  const [isOtpCreateClicked, setIsOtpCreateClicked] = useState(false);
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);

  //value
  const [otp, setOTP] = useState(""); // ประกาศตัวแปร otp และ setOTP
  const [OTPinput, setOTPinput] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;  

  const handleResetClick = async () => {
    setIsConfirmClicked(false);
    try {
      const response = await Axios.post("http://localhost:3001/checkAccount", {
        phone_number: phoneNumber,
      });
  
      if (response.status === 401) {
        alert("Unauthorized: เบอร์โทรศัพท์ หรือ password ของท่านผิด");
      } else if (response.data === "/found") {
        const emailResponse = await Axios.post("http://localhost:3001/getUserEmailByPhoneNumber", {
          phone_number: phoneNumber,
        });
  
        if (emailResponse.status === 200) {
          const otp = Math.floor(Math.random() * 9000 + 1000);
          setRecipientEmail(emailResponse.data.email)
          setOTP(otp);
          setIsresetClicked(false);
          setIsOtpCreateClicked(true);  
          await emailjs.send(
            'service_w7o0pfr', 
            'template_shdsfyv', {
            to_email: emailResponse.data.email,
            recipientEmail: emailResponse.data.email,
            otp: otp,
          }, 'FQ05itjgxwQe6PnRs')
  
        } else {
          alert("ไม่สามารถค้นหา email ได้");
        }
      } else {
        alert("เกิดข้อผิดพลาด");
        setIsresetClicked(false);
      }
    } catch (error) {
      alert("มีข้อผิดพลาดเกิดขึ้นในการส่งคำขอ");
      navigate("/forgot");
    }
  };

  function verifyOTP() {
    const enteredOTP = parseInt(OTPinput.join(""), 10); // แปลงรหัส OTP ที่ผู้ใช้กรอกเป็นตัวเลขและรวมเข้ากัน

    if (enteredOTP === otp) { // เปรียบเทียบรหัส OTP ที่ผู้ใช้กรอกกับรหัส OTP ที่ถูกสร้างขึ้นมา
      setIsConfirmClicked(true);
      setIsOtpCreateClicked(false);
    } else {
      alert("รหัส OTP ที่คุณป้อนไม่ถูกต้อง กรุณาลองอีกครั้งหรือขอรหัสใหม่"); // ถ้าไม่ตรงกันให้แสดงข้อความแจ้งเตือน
    }
  }

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
        <img src={logoIcon} alt="ต่อเติมบ้าน" className="logo-pc-forgot"/>
        <img src={logoMobile} alt="ต่อเติมบ้าน" className="logo-mb-forgot"/>
      </div>
      <div className="white-box-forgot">
        {isreset && (
          <div>
            <p class="head-text">สร้างรหัสผ่านใหม่</p>
            <p class="content-text">กรุณากรอกหมายเลขโทรศัพท์</p>

            <br></br>
            <input
              type="text"
              className="pass-input-forgot"
              placeholder="เบอร์โทรศัพท์"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>

            <br></br>
            <br></br>
            <button
              className="resetPasswordButtonPeng"
              onClick={handleResetClick}
            // onClick={checkEmail(testemail, testphoneNumber)}
            >
              รีเซตรหัสผ่าน
            </button>
          </div>
        )}
        {isOtpCreateClicked && (
          <div>
            <p class="head-text">สร้างรหัสผ่านใหม่</p>
            <p class="content-text">กรุณากรอก Otp ที่ส่งไปยังอีเมล</p>
            <p class="content-text">{recipientEmail}</p>

            <br></br>
            <input
              type="text"
              className="pass-input-forgot"
              placeholder="OTP"
              value={OTPinput.join("")} // ใช้ค่ารหัส OTP จาก OTPinput
              onChange={(e) => setOTPinput(e.target.value.split(""))} // อัปเดต OTPinput เมื่อผู้ใช้ป้อนข้อมูล
            ></input>
            <br></br>
            <br></br>
            <button
              className="resetPasswordButtonPeng"
              onClick={verifyOTP}
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
              className="pass-input-forgot"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={handlePasswordChange}
            ></input>
            <input
              type="password"
              className="confirm-pass-input-forgot"
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
