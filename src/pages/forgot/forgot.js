import React from "react";
import "./forgot.css";
import logoIcon from '../../assets/images/logo_withbg.png';
import TextInput from '../../components/textinput/textinput.js';
import Button from '../../components/button/button.js';

function Forgot() {
    return (
        <div className="app">
            <div className="blue-box-forgot">
                {/* กล่องสีน้ำเงิน */}
                <img
                    src={logoIcon}
                    alt="ต่อเติมบ้าน"
                    width="100"
                    height="100"
                />
            </div>
            <div className="white-box-forgot">
                <p class='head-text'>ลืมรหัสผ่านหรือไม่?</p>
                <p class='content-text'>กรุณากรอกหมายเลขโทรศัพท์หรือที่อยู่อีเมลของคุณ</p>
                <p class='last-text'>คุณจะได้รับลิงค์สำหรับสร้างรหัสผ่านใหม่ทางอีเมล</p>
                <TextInput placeholder="เบอร์โทรศัพท์ หรือ อีเมล" />
                <Button name="รีเซ็ตรหัสผ่าน" />
            </div>
        </div>
    );
}

export default Forgot;
