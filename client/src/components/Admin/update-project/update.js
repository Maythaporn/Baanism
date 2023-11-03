import { useEffect, useState } from "react";
import "./update.css";
import Axios from "axios";
import Modal from "react-modal";
import { FaImage, } from "react-icons/fa";

const UpdateProjects = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [info, setInfo] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [data, setData] = useState([]);
  const [cID, setCID] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIMG, setSelectedIMG] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      // Read the selected file as a data URL and set it as imageUrl
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedIMG(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // const data = [
  //     { id: 1, title: "ไม้ฝา เฌอร่า คืออะไร?" },
  //     { id: 2, title: "ไม้ฝา เฌอร่า คืออะไร?" },
  // ]

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleEditProject = (projectId) => {
    // Send an HTTP DELETE request to the server to delete the project.
    console.log(projectId);
    const formData = new FormData()
    formData.append('id', projectId)
    formData.append('title', title)
    formData.append('image', selectedFile)
    formData.append('caption', caption)
    formData.append('info', info)

    Axios.post("http://localhost:3001/edit_homecontent", formData)
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

  const openModal = (id) => {
    Axios.get(`http://localhost:3001/homecontent/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setImageUrl(response.data.img);
        setCaption(response.data.caption);
        setInfo(response.data.info);
      })
      .catch((error) => {
        console.error(error);
      });
    setCID(id)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFile(null)
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/homecontent")
      .then((response) => {
        setData(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteContent = (id) => {
    Axios.delete(`http://localhost:3001/deletecontent/${id}`).then(
      (response) => {
        setData(
          data.filter((val) => {
            return val.id !== id;
          })
        );
      }
    );
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("คุณแน่ใจที่ต้องการลบหรือไม่?");
    if (isConfirmed) {
      deleteContent(id);
    }
  };

  return (
    <>
      {data.map((e) => (
        <div className="admin-updateproject-container" key={e.id}>
          <div>
            <p className="project-title">{e.title}</p>
          </div>
          <div>
            <div className="edit">
              <button className="edit-btn" onClick={() => openModal(e.id)}>
                แก้ไขข้อมูล
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="แก้ไข"
                style={{
                  content: {
                    width: "320px", // Set the desired width
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
                  แก้ไข Home guru Content
                  <br></br>
                  <br></br>
                  <div className="inputMim">
                    หัวข้อ Content :
                    <input
                      type="text"
                      placeholder={title}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="inputIMG">
                    แนบรูปภาพ :
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileInputChange}
                    />
                    <label htmlFor="fileInput">
                      <FaImage
                        size={25}
                        color="black"
                        className="camera-icon"
                        style={{ cursor: "pointer" }}
                      />
                    </label>
                  </div>
                  <br></br>
                  {selectedFile ? (
                    <img
                      src={selectedIMG}
                      alt="Selected"
                      className="selected-image"
                      width="200px" // set the width to your desired size in pixels
                      height="200px" // set the height to your desired size in pixels
                    />) : (
                    <img
                      src={'http://localhost:3001/images/' + imageUrl}
                      alt="Selected"
                      className="selected-image"
                      width="200px" // set the width to your desired size in pixels
                      height="200px" // set the height to your desired size in pixels
                    />)}

                  <br></br>
                  <div className="inputMim-address">
                    Content Caption :
                    <textarea
                      style={{ width: "230px", height: "205px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                      className="text"
                      placeholder={caption}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  <div className="inputMim-address">
                    รายละเอียด content :
                    <textarea
                      style={{ width: "230px", height: "205px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
                      className="text"
                      placeholder={info}
                      value={info}
                      onChange={(e) => setInfo(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <div
                    className="model-button"
                    onClick={() => handleEditProject(cID)}
                  >
                    ยืนยัน
                  </div>
                </div>
              </Modal>
              <span className="space">|</span>
              <button
                className="edit-btn"
                onClick={() => {
                  handleDelete(e.id);
                }}
              >
                ลบ Content
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UpdateProjects;
