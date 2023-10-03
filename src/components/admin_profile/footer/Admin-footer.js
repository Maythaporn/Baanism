import React from 'react';
import './Footer.css'; // Import your CSS file
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <nav className="footer">
      <p className='word'>Copyright © 2023 BAANISM Co., Ltd. All rights reserved.</p>
      <Link to="/">
        <p className="word">นโยบายการใช้งาน</p>
      </Link>
      <Link to="/">
        <p className="word">ติดต่อสอบถาม</p>
      </Link>
      <Link to="/">
        <p className="word">เงื่อนไขการใช้งาน</p>
      </Link>
    </nav>
  );
}
