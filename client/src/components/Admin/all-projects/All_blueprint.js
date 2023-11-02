import "./All_blueprint.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "react-modal";

import Thai_provinces from "../../../thai_provinces.js";
import Thai_district from "../../../thai_amphures.js";
import Thai_subdistrict from "../../../thai_tambons.js";

const AllProjects = () => {
  const [data, setData] = useState([]);

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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (id) => {

    Axios.get("http://localhost:3001/project_adminID", {
      params: {
        id: id,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const user = response.data[0]; // Access the first object in the array (assuming there's only one user)
        if (user) {
          setName(user.project_name);
          setDeveloper(user.developer);
          setAddress(user.address);
          setZip(user.zipcode);
          setImg(user.img);
          setSelectedProvince(user.provinces);
          setSelectedDistrict(user.district);
          setSelectedSubdistrict(user.subdistrict);
          // Access and use other properties as needed
        } else {
          console.log("No user data found");
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });

    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteProject = (projectId) => {
    // Send an HTTP DELETE request to the server to delete the project.
    console.log(projectId);

    Axios.post("http://localhost:3001/delete-adminproject", {
      projectId: projectId,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("ลบโครงการเรียบร้อย");
          window.location.href = `/admin`;
          // navigate(`/user_profile/${phoneNumber}`); // Redirect to the user profile page with phone_number as a parameter
        }
      })
      .catch((error) => {
        alert("เกิดข้อผิดพลากกรุณาลองใหม่อีกครั้ง");
      }); // put ur page after /
  };

  const handleEditProject = (projectId) => {
    // Send an HTTP DELETE request to the server to delete the project.
    console.log(projectId);

    Axios.post("http://localhost:3001/edit_adminproject", {
      id:projectId,
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

  // const alertstatus = (id) => {
  //   <Modal
  //     isOpen={modalIsOpen} // Replace with the variable or state that controls modal visibility
  //     onRequestClose={closeModal} // Replace with your closeModal function
  //     contentLabel="Example Modal"
  //   >
  //     <button onClick={closeModal}>Close Modal</button>
  //     <input
  //       type="text"
  //       placeholder="อัพเดตสถานะ"
  //       value={status}
  //       onChange={handleInputChange} // Replace with your handleInputChange function
  //     />
  //   </Modal>;
  // };

  useEffect(() => {
    setProvinces(Thai_provinces);
    setDistrict(Thai_district);
    setSubdistrict(Thai_subdistrict);


    Axios.get("http://localhost:3001/getadminproject")
      .then((response) => {
        if (response.status === 200) {
          setData(response.data); // Assuming the response contains an array of project data
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  return (
    <>
      {data.map((e) => (
        <div className="blueprint-allproject-container" key={e.id}>
          <div className="allproject-left">
            <p className="allproject-title">{e.project_name}</p>
            <p>Developer : {e.developer}</p>
            <p>สถานที่ : {e.address}</p>
            <br></br>
            <br></br>
            <img src={e.img} className="img-admin"></img>
            <br></br>
            <br></br>
          </div>
          <div className="allproject-right">
            <p style={{ fontSize: "12px" }}>
              {e.provinces} , {e.district}
            </p>
            <div className="allproject-edit">
              <button
                className="allproject-btn"
                onClick={() => openModal(e.id)}
              >
                แก้ไข
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="แก้ไข"
                style={{
                  content: {
                    width: "300px", // Set the desired width
                    height: "400px", // Set the desired height
                    margin: "auto", // Center the modal horizontally
                  },
                }}
              >
                <button onClick={closeModal}>X</button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <br></br>
                  แก้ไขแบบโครงการที่อยู่อาศัย
                  <br></br>
                  <br></br>
                  <div className="inputMim">
                    ชื่อโครงการ :
                    <input
                      type="text"
                      placeholder={name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="inputMim">
                    Developer :
                    <input
                      type="text"
                      placeholder={developer}
                      value={developer}
                      onChange={(e) => setDeveloper(e.target.value)}
                    />
                  </div>
                  <div className="inputMim-address">
                    ที่อยู่ :
                    <textarea
                      style={{ width: "230px", height: "205px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                      className="text"
                      placeholder={address}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="inputMim">
                    จังหวัด
                    <select
                      style={{ width: "230px" }}
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
                  <div className="inputMim">
                    อำเภอ
                    <select
                      style={{ width: "230px" }}
                      id="dropdownProvinces"
                      className="text"
                      value={selectedDistrict} // The selected province is bound to the value of the select element
                      onChange={(e) => setSelectedDistrict(e.target.value)} // This function will be called when the selection changes
                    >
                      {/* Default empty option */}
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
                  <div className="inputMim">
                    ตำบล
                    <select
                      style={{ width: "230px" }}
                      id="dropdownProvinces"
                      className="text"
                      value={selectedSubdistrict} // The selected province is bound to the value of the select element
                      onChange={(e) => setSelectedSubdistrict(e.target.value)} // This function will be called when the selection changes
                    >
                      {/* Default empty option */}
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
                  <div className="inputMim">
                    รหัสไปรษณีย์ :
                    <input
                      type="text"
                      placeholder={zip}
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                  <div className="inputMim">
                    ภาพแบบตัวอย่าง (URL) :
                    <input
                      type="text"
                      placeholder={img_link}
                      value={img_link}
                      onChange={(e) => setImg(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <div
                    className="model-button"
                    onClick={() => handleEditProject(e.id)}
                  >
                    ยืนยัน
                  </div>
                </div>
              </Modal>
              <span className="allproject-space">|</span>
              <button
                className="allproject-btn"
                onClick={() => handleDeleteProject(e.id)}
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllProjects;
