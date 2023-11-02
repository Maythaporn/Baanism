import React, { useState, useEffect } from "react";
import "./content.css"; // Import the CSS file for this component
import "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
import { FaImage, } from "react-icons/fa";
import Axios from "axios";

function Assign1() {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [info, setInfo] = useState('')

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      // Read the selected file as a data URL and set it as imageUrl
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isInputValid = title !== "" && caption !== "" && info !== ""
    setIsFormValid(isInputValid)
  }, [title, caption, info, selectedFile])

  const addContent = () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('image', selectedFile)
    formData.append('caption', caption)
    formData.append('info', info)
    if (isFormValid) {
      Axios.post("http://localhost:3001/addcontent", formData).then((response) => {
        setTitle("")
        setCaption("")
        setInfo("")
        setSelectedFile(null)
        setImageUrl(null)
      })
      alert('เพิ่มข้อมูลเรียบร้อยแล้ว');
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
    }
  }

  return (
    <div>
      <p className="titletext">อัพเดต HomeGURU Content</p>
      <hr
        style={{
          height: "40px",
        }}
      />
      <div className="assign-input-container">
        <div className="area-input">
          หัวข้อ Content :
          <input
            style={{ width: "130px" }} // Set the width using inline CSS
            className="text"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={selectedFile ? "blueprint2" : "blueprint"}>
          <div>
            {" "}
            แนบรูปภาพ :
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
            {"  "}
            <label htmlFor="fileInput">
              <FaImage
                size={30}
                color="black"
                className="camera-icon"
                style={{ cursor: "pointer" }}
              />
            </label>
          </div>
          {selectedFile && (
            <>
              <p className="text1">ไฟล์ที่ท่านเลือก : {selectedFile.name}</p>
              <hr
                style={{
                  height: "20px",
                }}
              />

              <img
                src={imageUrl}
                alt="Selected"
                className="selected-image"
                width="400"  // set the width to your desired size in pixels
                height="300" // set the height to your desired size in pixels
              />
            </>
          )}
        </div>
        <div className="address2-input">
          Content Caption :
          <textarea
            style={{ width: "385px", height: "100px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
            className="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="address2-input">
          รายละเอียด content :
          <textarea
            style={{ width: "385px", height: "100px" }} // กำหนดความกว้างและความสูงในรูปแบบ inline CSS
            className="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
      </div>

      <div className="assign-input1-container">
        <div className="assign1-confirm-button" onClick={addContent}>ยืนยันข้อมูล</div>
      </div>
    </div>
  );
}

export default Assign1;
