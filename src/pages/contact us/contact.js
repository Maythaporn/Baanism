import React, { useState } from "react";
import "./contact.css";
import 'font-awesome/css/font-awesome.min.css';
import TextInput from "../../components/textinput_cont/textinput_cont";
import linelogo from './../../assets/images/line.png';
import fblogo from './../../assets/images/facebook.png';
import tiktoklogo from './../../assets/images/tik-tok.png';

function Contact() {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (index) => {
    if (selectedCheckbox === index) {
      setSelectedCheckbox(null);
    } else {
      setSelectedCheckbox(index);
    }

    if (index === 3) {
      // ถ้า checkbox เป็น 3 ให้เปิด contact form
      document.querySelector('.contact-form').classList.add('active');
    } else {
      // ถ้า checkbox ไม่ใช่ 3 ให้ปิด contact form
      document.querySelector('.contact-form').classList.remove('active');
    }
  };

  return (
    <div className="background">
      <div className="contact-left">
        <h3> ติดต่อสอบถาม </h3>
        <div className="icon">

          {/* Text */}
          <div className="icon-social">
            <a href="https://www.facebook.com/BAANISM" className="icon-facebook" title="Facebook" target="_blank">
              <img src={fblogo} alt="facebook-logo" className="icon-facebook" style={{ width: '30px', height: '30px' }} />
            </a>
            <a href="https://www.facebook.com/BAANISM" className="icon-text" title="Facebook" target="_blank"> https://www.facebook.com/BAANISM</a>
          </div>

          {/* Text */}
          <div className="icon-social">
            <a href="https://lin.ee/dKPfd2C2" className="icon-line" title="Line" target="_blank">
              <img src={linelogo} alt="line-logo" className="icon-line" style={{ width: '32px', height: '30px' }} />
            </a>
            <a href="https://lin.ee/dKPfd2C2" className="icon-text" title="Line" target="_blank"> @baanism</a>
          </div>

          {/* Text */}
          <div className="icon-social">
            <a href="mailto:contact@baanism.com" class="icon-mail" title="E-Mail" ><i className="fa fa-envelope"></i></a>
            <a href="mailto:contact@baanism.com" class="icon-text" title="E-Mail" > contact@baanism.com</a>
          </div>

          {/* Text */}
          <div className="icon-social">
            <a href="#" title="Tel." class="icon-phone"><i className="fa fa-phone"></i></a>
            <a href="#" title="Tel." class="icon-text"> (+66) 085-055-6352</a>
          </div>

          {/* Text */}
          <div className="icon-social">
            <a href="https://www.tiktok.com/@baanism" className="icon-tiktok" title="Tiktok" target="_blank">
              <img src={tiktoklogo} alt="tiktok-logo" className="icon-tiktok" style={{ width: '30px', height: '30px' }} />
            </a>
            <a href="https://www.tiktok.com/@baanism" className="icon-text" title="Tiktok" target="_blank"> @baanism</a>
          </div>

        </div>
      </div>

      <div className="contact-right">
        <h3>Contact Form</h3>
        <div className={`contact-form ${selectedCheckbox === 3 ? 'active' : ''}`}>

          <div className="textform">
            <TextInput placeholder="ชื่อ-สกุล" />
            <TextInput placeholder="หมายเลขโทรศัพท์" />
          </div>

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                className="custom-checkbox"
                onChange={() => handleCheckboxChange(1)}
                checked={selectedCheckbox === 1}
              />
              <span className="label-text"> สอบถามราคาและแพ็คเกจ</span>
            </label>

            <label>
              <input
                type="checkbox"
                className="custom-checkbox"
                onChange={() => handleCheckboxChange(2)}
                checked={selectedCheckbox === 2}
              />
              <span className="label-text"> จองคิวหน้างาน</span>
            </label>

            <div className="row-other-input">
              <label>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  onChange={() => handleCheckboxChange(3)}
                  checked={selectedCheckbox === 3}
                />
                <span className="label-text"> อื่นๆ โปรดระบุ</span>
              </label>

              {selectedCheckbox === 3 && (
                <div className={`other-input ${selectedCheckbox === 3 ? 'active' : ''}`}>
                  <TextInput placeholder="โปรดระบุ" />
                </div>
              )}


            </div>
          </div>


          <div className="button-container" >
            <button className="button-contact">ส่ง</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
