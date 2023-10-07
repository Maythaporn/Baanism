import React from 'react';
import './Footer.css'; // Import your CSS file
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <nav className="footer">
      Copyright © 2023 BAANISM Co., Ltd. All rights reserved.
      <Link to="/">
        นโยบายการใช้งาน
      </Link>
      <Link to="/">
        ติดต่อสอบถาม
      </Link>
      <Link to="/">
        เงื่อนไขการใช้งาน
      </Link>
    </nav>
  );
}
