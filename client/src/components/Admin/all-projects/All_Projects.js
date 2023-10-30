import "./All_Projects.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";

const AllProjects = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);

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

  const updatestatus = (projectId,status) => {
    // Send an HTTP DELETE request to the server to delete the project.
    Axios.post("http://localhost:3001/updatestatus", {
      id: projectId,
      status: status
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
            <p>
              สถานะ : <span class="allproject-status"></span>
              {e.status}
            </p>
            <input
              type="text"
              placeholder="อัพเดตสถานะ"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <div className="allproject-edit">
              <button className="allproject-btn" onClick={() => updatestatus(e.id,status)}>แก้ไขข้อมูล</button>
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
