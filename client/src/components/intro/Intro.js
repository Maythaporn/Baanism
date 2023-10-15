import React from "react";
import "./Intro.css"; // Import the CSS file for this component
import { Link } from "react-router-dom";

function Intro() {
   return (
      <div className="IntroContainer">
         <div className="space-intro">
            <h1 className="IntroTitle">PREFABVOLUTION</h1>
            <h1 className="IntroTitle">EXTENDING</h1>
            <h1 className="IntroTitle">INNOVATION.</h1>
            <br />

            <p className="IntroContent">
               ต่อเติมบ้านอย่างมีคุณภาพด้วย PrefabVolution
            </p>
            <p className="IntroContent">ผลิตจากอุตสาหกรรม ลดปัญหางานก่อสร้าง</p>
            <p className="IntroContent">ติดตั้งไว จบงานเร็วสุด 14 วัน</p>

            <br />

            <button className="free_estimate">
               <Link to="/estimate">ประเมินราคา ฟรี</Link>
            </button>
         </div>
      </div>
   );
}

export default Intro;
