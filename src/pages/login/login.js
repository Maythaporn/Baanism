import React from "react";
import "./login.css";
import logoIcon from '../../assets/images/logo_withbg.png';
import TextInput from '../../components/textinput/textinput.js';
import Button from '../../components/button/button.js';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from "react";

function Login() {
    const navigate = useNavigate();

    const btnLogin = () => {
        navigate('/user_profile'); // put ur page after /
    }
    const btnForgot = () => {
        navigate('/forgot'); // put ur page after /
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
                <TextInput placeholder="เบอร์โทรศัพท์" />
                <TextInput placeholder="รหัสผ่าน" />
                <Link to='/forgot'>
                    <button className="forgot-password-button" onClick={btnForgot}>
                        ลืมรหัสผ่าน
                    </button>
                </Link>
                <div className="button-container">
                    <Link to='/user_profile'>
                        <button className='login-button' onClick={btnLogin}>
                            เข้าสู่ระบบ
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
