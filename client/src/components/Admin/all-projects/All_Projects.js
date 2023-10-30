import "./All_Projects.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "react-modal";
import { Link, useNavigate, useParams } from "react-router-dom";

const AllProjects = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDeleteProject = (projectId) => {
    // Send an HTTP DELETE request to the server to delete the project.
    console.log(projectId);

    Axios.post("http://localhost:3001/delete-project", {
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

  const updatestatus = (projectId, status) => {
    Axios.post("http://localhost:3001/updatestatus", {
      id: projectId,
      status: status,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("อัพเดตสถานะเรียบร้อย");
          window.location.href = `/admin`;
          // navigate(`/user_profile/${phoneNumber}`); // Redirect to the user profile page with phone_number as a parameter
        }
      })
      .catch((error) => {
        alert("เกิดข้อผิดพลากกรุณาลองใหม่อีกครั้ง");
      }); // put ur page after /
  };

  const PDF = (phoneNumber,id) => {
    window.location.href = `/document/${phoneNumber}/${id}`;
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/project_admin", {})
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle any network or server errors here
        console.error("Error fetching user data: ", error);
        // You might want to display a user-friendly error message to the user
      });
    // // Add an event listener to track window size changes
    // function handleResize() {
    //   setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    // }

    // // Initial check
    // handleResize();

    // // Add event listener on component mount
    // window.addEventListener("resize", handleResize);

    // // Clean up event listener on component unmount
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);
  return (
    <>
      {data.map((e) => (
        <div className="admin-allproject-container" key={e.id}>
          <div className="allproject-left">
            <p className="allproject-title">{e.project_type}</p>
            <p>ประเภทห้อง : {e.room_type}</p>
            <p>สถานที่ : {e.address}</p>
          </div>
          <div className="allproject-right">
            <p >สถานะ :{" "}{e.status}</p>
            <div className="allproject-edit">
              <button className="allproject-btn" onClick={() => openModal()}>
                อัพเดตสถานะโครงการ
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="อัพเดตสถานะโครงการ"
                style={{
                  content: {
                    width: "400px", // Set the desired width
                    height: "300px", // Set the desired height
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
                  <div className="inputMim">
                    อัพเดตสถานะ
                    <input
                      type="text"
                      placeholder="รอการติดต่อกลับ"
                      value={status}
                      onChange={handleInputChange}
                    />
                  </div>
                  <br></br>
                  <div
                    className="model-button"
                    onClick={() => updatestatus(e.id, status)}
                  >
                    ยืนยัน
                  </div>
                </div>
              </Modal>
              <span className="allproject-space">|</span>
              <button
                className="allproject-btn"
                onClick={() => PDF(e.phone_number,e.id)}
              >
               ดูรายละเอียดโครงการ
              </button>
              <span className="allproject-space">|</span>
              <button
                className="allproject-btn"
                onClick={() => handleDeleteProject(e.id)}
              >
                ลบโครงการ
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllProjects;
