import React, { useState, useEffect } from "react";
import "./case2.css"; // Import the CSS file for this component
import "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
import Axios from "axios";

import Thai_provinces from "../../../thai_provinces.js";
import Thai_district from "../../../thai_amphures.js";
import Thai_subdistrict from "../../../thai_tambons.js";

function Assign1(props) {
  const [isMobile, setIsMobile] = useState(false);

  const [province, setProvinces] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subdistrict, setSubdistrict] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  const [zip, setZip] = useState("");
  const [name, setName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [address, setAddress] = useState("");
  const [img_link, setImg] = useState("");

  const createProject = () => {
    Axios.post("http://localhost:3001/addproject", {
      project_name: name,
      developer: developer,
      address: address,
      provinces: selectedProvince,
      district: selectedDistrict,
      subdistrict: selectedSubdistrict,
      img: img_link,
      zipcode: zip,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("ดำเนินการเสร็จสิ้น");
          window.location.href = `/admin`;
        }
      })
      .catch((error) => {
        alert("เกิดข้อผิดพลากกรุณาลองใหม่อีกครั้ง");
      }); // put ur page after /
  };

  useEffect(() => {
    setProvinces(Thai_provinces);
    setDistrict(Thai_district);
    setSubdistrict(Thai_subdistrict);

    // Add an event listener to track window size changes
    function handleResize() {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    }

    // Initial check
    handleResize();

    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="head">
      <p className="titletext-assign">แก้ไขแบบโครงการที่อยู่อาศัยเข้าระบบ</p>
      <hr
        style={{
          height: "30px",
        }}
      />
      <div className="assign-input3-container">
        <div className="column">
          <div className="area-input-assign">
            ชื่อโครงการ :
            <input
              style={{ width: "230px" }} // Set the width using inline CSS
              className="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="column ">
          <div className="area-input-assign">
            Developer :
            <input
              style={{ width: "230px" }} // Set the width using inline CSS
              className="text"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="assign-input4-container">
        <div className="column-address">
          <div className="address3-input">
            ที่อยู่ :
            <textarea
              style={{ width: isMobile ? "170px" : "400px" , height: "198px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
              className="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <br></br>
        <div className="column-address">
          <div className="text-input-provinces-assign">
            จังหวัด :
            <select
              style={{ width: isMobile ? "280px" : "400px"}}
              id="dropdownProvinces"
              className="text"
              value={selectedProvince} // The selected province is bound to the value of the select element
              onChange={(e) => setSelectedProvince(e.target.value)} // This function will be called when the selection changes
            >
              {/* Default empty option */}
              {province.map((state) => (
                <option key={state.id} value={state.name_th}>
                  {state.name_th}
                </option>
              ))}
            </select>
          </div>
      <br></br>
          <div className="row-assign">
            <div className="dropdown-input-assign">
              เขต/อำเภอ :
              <br />
              <select
                style={{ width: isMobile ? "110px" : "175px" }}
                id="dropdownDistrict"
                className="text"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                {" "}
                {district
                  .filter((state) => {
                    const provinceIds = province
                      .filter(
                        (province_id) =>
                          province_id.name_th === selectedProvince
                      )
                      .map((province_id) => province_id.id);
                    return provinceIds.includes(state.province_id);
                  })
                  .map((state) => (
                    <option key={state.id} value={state.name_th}>
                      {state.name_th}
                    </option>
                  ))}
              </select>
            </div>

            <div className="dropdown-input-assign">
              แขวง/ตำบล :
              <br />
              <select
                style={{ width: isMobile ? "110px" : "175px"}}
                id="dropdown"
                className="text"
                value={selectedSubdistrict}
                onChange={(e) => setSelectedSubdistrict(e.target.value)}
              >
                {/* Default empty option */}{" "}
                {subdistrict
                  .filter((state) => {
                    const districtIds = district
                      .filter(
                        (district_id) =>
                          district_id.name_th === selectedDistrict
                      )
                      .map((district_id) => district_id.id);
                    return districtIds.includes(state.amphure_id);
                  })
                  .map((state) => (
                    <option key={state.id} value={state.name_th}>
                      {state.name_th}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="assign-input5-container">
        <div className="column2-assign">
          {" "}
          <div className="area-input-assign">
            แบบตัวอย่างของโครงการ (กรุณาใส่เป็น URL ของภาพ) :
            <input
              style={{ width: isMobile ? "170px" : "300px" }} // Set the width using inline CSS
              className="text"
              type="text"
              value={img_link}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
        </div>
        <div className="column2-assign">
          {" "}
          <div className="area-input-assign">
            รหัสไปรษณีย์ :
            <input
              style={{width: isMobile ? "170px" : "300px" }} // Set the width using inline CSS
              className="text"
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
         
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="assign1-confirm-button" onClick={createProject}>
        ยืนยันข้อมูล
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

export default Assign1;
