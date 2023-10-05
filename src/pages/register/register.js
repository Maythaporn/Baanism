import React from "react";
import "./register.css";
import logoIcon from '../../assets/images/logo_withbg.png';
import TextInput from '../../components/textinput/textinput.js';
// import Button from '../../components/button/button.js';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Button from "../../components/button/button";


function Register() {

    const navigate = useNavigate();
  
    const btnConfirm = () => {
        navigate('/user'); // put ur page after /
    }

    return (
        <div className="app">
            <div className="blue-box-register">
                {/* กล่องสีน้ำเงิน */}
                <img
                    src={logoIcon}
                    alt="ต่อเติมบ้าน"
                    width="100"
                    height="100"
                />
            </div>
            <div className="white-box-register">
                <h1 className="head-register">สมัครสมาชิก</h1>
                <TextInput placeholder="ชื่อจริง" />
                <TextInput placeholder="นามสกุล" />
                <TextInput placeholder="เบอร์โทรศัพท์" />
                <TextInput placeholder="อีเมล" />
                <TextInput placeholder="รหัสผ่าน" />
                <TextInput placeholder="ยืนยันรหัสผ่าน" />
                <Link to='/user'>
                    <button className='confirmbutton' onClick={btnConfirm}>
                        สมัครสมาชิก
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Register;