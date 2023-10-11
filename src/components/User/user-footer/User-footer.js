import React from 'react';
import './User-footer.css'; // Import your CSS file
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="mim-Userfooter">
    <div>Copyright © 2023 BAANISM Co., Ltd. All rights reserved.</div>
    <div>
      <Link to="/">นโยบายการใช้งาน</Link>
    </div>
    <div>
      <Link to="/">ติดต่อสอบถาม</Link>
    </div>
    <div>
      <Link to="/">เงื่อนไขการใช้งาน</Link>
    </div>
  </div>
  );
}
