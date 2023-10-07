import React from "react";
import "./login.css";
import logoIcon from '../../assets/images/logo_withbg.png';
import TextInput from '../../components/textinput/textinput.js';
import Button from '../../components/button/button.js';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from "react";

function Login() {
    const navigate = useNavigate();

    const btnEdit = () => {
        navigate('/user-edit'); // put ur page after /
    }
    const btnForgot = () => {
        navigate('/forgot-password'); // put ur page after /
    }
    return (
        <div className="app">
            <div className="blue-box-login">
                {/* กล่องสีน้ำเงิน */}
                <img
                    src={logoIcon}
                    alt="ต่อเติมบ้าน"
                    width="100"
                    height="100"
                />
            </div>
            <div className="white-box-login">
                <h1 class="head-login">กรอกข้อมูลเข้าสู่ระบบ</h1>
                <input type="text" className="tel-input" placeholder="เบอร์โทรศัพท์"></input>
                <input type="password" className="password-input" placeholder="รหัสผ่าน"></input>
                <button className="forgot-password-button" onClick={btnForgot}>ลืมรหัสผ่าน</button>
                <button className='login-button' onClick={btnEdit}>เข้าสู่ระบบ</button>    
            </div>
        </div>
    );
}

export default Login;
