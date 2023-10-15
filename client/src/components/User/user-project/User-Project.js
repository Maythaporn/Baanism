import React, { useState, useEffect } from "react";
import "./User-project.css"; // Import the CSS file for this component
import "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Project() {

  return (
    <div>
      <div className="addproject">
        <Link to="/Assignment1">
          <div className="adproject-button">
            <FaPlus size={10} color="white" /> เพิ่มโครงการ
          </div>
        </Link>
      </div>
      <br></br>
      <br></br>
      <p className="normaltext">ไม่มีโครงการของท่าน ณ ตอนนี้ </p>
    </div>
  );
}

export default Project;
