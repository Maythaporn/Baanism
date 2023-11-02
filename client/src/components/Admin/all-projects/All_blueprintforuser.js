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
          </div>
        </div>
      ))}
    </>
  );
};

export default AllProjects;
