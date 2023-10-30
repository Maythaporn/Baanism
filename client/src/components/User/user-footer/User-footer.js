import React from "react";
import "./User-footer.css"; // Import your CSS file
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mim-Footer">

      <p className="textcopy">
        Copyright © 2023 BAANISM Co., Ltd. All rights reserved.
      </p>
        <Link to="/">นโยบายการใช้งาน</Link>

        <Link to="/">ติดต่อสอบถาม</Link>

        <Link to="/">เงื่อนไขการใช้งาน</Link>
  
    </div>
  );
}
