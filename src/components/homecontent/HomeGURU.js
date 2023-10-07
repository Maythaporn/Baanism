import React from "react";
import "./HomeGURU.css"; // Import the CSS file for this component
import content1 from "../../assets/images/content1.png"
import content2 from "../../assets/images/content2.png"
import content3 from "../../assets/images/content3.png"
import content4 from "../../assets/images/content4.png"
import ContentInfo from "./ContentInfo";

function Intro() {
  const data = [
    { id: 1, img: content1, title: "เลือกเสาเข็มให้เหมาะกับพื้นที่ใช้งานลดโอกาสบ้านทรุด!", info: "เลือกใช้เสาเข็มให้เหมาะกับพื้นที่นอกจากจะลดการทรุดตัวได้แล้วยังช่วยประหยัดค่าใช้จ่าย และคุ้มค่าในระยะยาว" },
    { id: 2, img: content2, title: "5 หลังคาสุดฮิตในการต่อเติม", info: "หลังคาเป็นอีกวัสดุสำคัญที่มีผลต่อราคาและการใช้งาน มารู้จัก 5 หลังคาสุดฮิตในการต่อเติม พร้อมคำแนะนำในการเลือกใช้จากสถาปนิกบ้านนิซึ่ม" },
    { id: 3, img: content3, title: "ผนังโครงสร้างเหล็กสำเร็จรูปคืออะไร?", info: "ทำไมต้องใช้ผนังโครงสร้างเหล็กสำเร็จรูปเปรียบเทียบกับผนังก่ออิฐฉาบปูนทั่วไป" },
    { id: 4, img: content4, title: "ทำเคาน์เตอร์ครัวปูน ต้องดูอะไรบ้าง?", info: "เคาน์เตอร์ครัวปูน เป็นอีกรูปแบบเคาน์เตอร์ที่เน้นการใช้งานหนัก ทนทาน และราคาไม่สูง สามารถกำหนดงบประมาณได้" }
  ]
  return (
    <div className="HomeGURUContainer">
      <h2 className="HomeGURUContent">ความรู้เรื่องต่อเติมบ้าน</h2>
      <div className="content">
        {data.map((e) => {
          return <ContentInfo {...e} />
        })}
      </div>
    </div>
  );
}

export default Intro;
