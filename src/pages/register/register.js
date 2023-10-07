import React from "react";
import "./register.css";
import logoIcon from '../../assets/images/logo_withbg.png';
import TextInput from '../../components/textinput/textinput.js';
// import Button from '../../components/button/button.js';
import { useNavigate,} from 'react-router-dom';
import { useState } from "react";
import Button from "../../components/button/button";


function Register() {

    const navigate = useNavigate();

    const [isTermsChecked, setIsTermsChecked] = useState(false); // State for checkbox

    const btnConfirm = () => {
        if (!isTermsChecked) {
            alert('โปรดยอมรับข้อกำหนดและเงื่อนไขก่อนการสมัครสมาชิก');
            return;
        }
        navigate('/user'); // Navigate to your page
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
                <input type="text" className="name-input" placeholder="ชื่อจริง"></input>
                <input type="text" className="surname-input" placeholder="นามสกุล"></input>
                <input type="text" className="tele-input" placeholder="เบอร์โทรศัพท์"></input>
                <input type="text" className="email-input" placeholder="อีเมล"></input>
                <input type="text" className="pass-input" placeholder="รหัสผ่าน"></input>
                <input type="text" className="confirm-pass-input" placeholder="ยืนยันรหัสผ่าน"></input>
                <div className="terms-condition">
                <input 
                        type="checkbox" 
                        id="terms" 
                        name="terms"
                        checked={isTermsChecked} 
                        onChange={e => setIsTermsChecked(e.target.checked)} 
                        required 
                    />
                    <div className ="terms-text">
                    <label htmlFor="terms">ข้อกำหนดและเงื่อนไข</label>
                    </div>
                </div>
                <button 
                    className='confirm-button' 
                    onClick={btnConfirm}
                >
                        สมัครสมาชิก
                    </button>
            </div>
        </div>
    );
}

export default Register;