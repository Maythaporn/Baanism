import React, { useState, useRef } from "react";
import emailjs from 'emailjs-com';
import "./contact.css";
import 'font-awesome/css/font-awesome.min.css';
import linelogo from './../../assets/images/line.png';
import fblogo from './../../assets/images/facebook.png';
import tiktoklogo from './../../assets/images/tik-tok.png';

function Contact() {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [fullName, setFullName] = useState('');
  const [number, setNumber] = useState('');
  const [otherInput, setOtherinput] = useState('');
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if ((fullName !== '' && number !== '' && number.length > 9) && selectedCheckbox !== null) {
      if (selectedCheckbox === 3) {
        if (otherInput === '') {
          alert("โปรดระบุรายละเอียด");
        } else if (otherInput !== '') {
          emailjs.sendForm('service_w7o0pfr', 'template_rf346zh', form.current, 'FQ05itjgxwQe6PnRs')
            .then((result) => {
              console.log(result.text);
              alert("ส่งข้อมูลเรียบร้อยแล้ว");
              setFullName('');
              setNumber('');
              setOtherinput('');
              setSelectedCheckbox(null);
            }, (error) => {
              console.log(error.text);
            });
        }
      } else {
        emailjs.sendForm('service_w7o0pfr', 'template_rf346zh', form.current, 'FQ05itjgxwQe6PnRs')
          .then((result) => {
            console.log(result.text);
            alert("ส่งข้อมูลเรียบร้อยแล้ว");
            setFullName('');
            setNumber('');
            setSelectedCheckbox(null);
          }, (error) => {
            console.log(error.text);
          });
      }

    } else if (fullName === '' || number === '' && selectedCheckbox === null) {
      alert("กรุณากรอกข้อมูลและเลือกข้อมูลที่ต้องการสอบถาม");
    } else if (fullName !== '' && number !== '' && selectedCheckbox === null) {
      alert("กรุณาเลือกข้อมูลที่ต้องการสอบถาม");
    } else if (fullName === '' || number === '' && selectedCheckbox !== null) {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } else if (fullName !== '' || number !== '' || number.length !== 10 && selectedCheckbox !== null) {
      alert("กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง");
    };
  }

  const handleChange = (e) => {
    if (e.target.name === 'user_name') {
      setFullName(e.target.value);
    } else if (e.target.name === 'user_question') {
      setOtherinput(e.target.value);
    }
    const value = e.target.value.replace(/\D/g, ''); // เอาตัวอักษรทั้งหมดที่ไม่ใช่ตัวเลขออก
    if (value.length <= 10) {
      setNumber(value);
    }
  };

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
              <img src={fblogo} alt="facebook-logo" className="icon-facebook" />
            </a>
            <a href="https://www.facebook.com/BAANISM" className="icon-text" title="Facebook" target="_blank"> https://www.facebook.com/BAANISM</a>
          </div>

          {/* Text */}
          <div className="icon-social">
            <a href="https://lin.ee/dKPfd2C2" className="icon-line" title="Line" target="_blank">
              <img src={linelogo} alt="line-logo" className="icon-line"  />
            </a>
            <a href="https://lin.ee/dKPfd2C2" className="icon-text" title="Line" target="_blank">@baanism</a>
          </div>

          {/* Text */}
          <div className="icon-social">
            <a href="mailto:contact@baanism.com" class="icon-mail" title="E-Mail" ><i className="fa fa-envelope"></i></a>
            <a href="mailto:contact@baanism.com" class="icon-text" title="E-Mail" >contact@baanism.com</a>
          </div>

          {/* Text */}
          <div className="icon-social">
            <a href="#" title="Tel." class="icon-phone"><i className="fa fa-phone"></i></a>
            <a href="#" title="Tel." class="icon-text"> (+66) 085-055-6352</a>
          </div>

          {/* Text */}
          <div className="icon-social">
            <a href="https://www.tiktok.com/@baanism" className="icon-tiktok" title="Tiktok" target="_blank">
              <img src={tiktoklogo} alt="tiktok-logo" className="icon-tiktok" />
            </a>
            <a href="https://www.tiktok.com/@baanism" className="icon-text" title="Tiktok" target="_blank">@baanism</a>
          </div>

        </div>
      </div>
      <div className="contact-right">
        <h3>Contact Form</h3>
        <div className={`contact-form ${selectedCheckbox === 3 ? 'active' : ''}`}>
          <form ref={form} onSubmit={sendEmail}>

            <div className="textform">
              <input
                className="text-input-contact"
                placeholder="ชื่อ-สกุล"
                value={fullName}
                name="user_name"
                onChange={handleChange}
              />
              <input
                className="text-input-contact"
                placeholder="หมายเลขโทรศัพท์"
                value={number}
                name="user_tel"
                onChange={handleChange}
              />
            </div>

            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  onChange={() => handleCheckboxChange(1)}
                  checked={selectedCheckbox === 1}
                  value="สอบถามราคาและแพ็คเกจ"
                  name="user_question"
                />
                <span className="label-text"> สอบถามราคาและแพ็คเกจ</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  onChange={() => handleCheckboxChange(2)}
                  checked={selectedCheckbox === 2}
                  value="จองคิวหน้างาน"
                  name="user_question"
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
                    <input
                      className="text-input-contact-other"
                      placeholder="โปรดระบุ"
                      name="user_question"
                      value={otherInput}
                      onChange={handleChange} />

                  </div>
                )}
              </div>
            </div>
            <div className="button-container">
              <button type="submit" className="button-contact">ส่ง</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
