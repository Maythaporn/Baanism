import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "./../../../assets/images/logo-header.png";
import "./page.css";
import Axios from "axios";

const MyDocument = () => {
  const { phone_number, id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [project_type, setproject_type] = useState("");
  const [room_type, setroom_type] = useState("");
  const [project_name, setproject_name] = useState("");
  const [sq_meter, setsq_meter] = useState("");
  const [start_date, setstart_date] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [address, setaddress] = useState("");
  const [etc, setetc] = useState("");
  const [provinces, setprovinces] = useState("");
  const [district, setdistrict] = useState("");
  const [subdistrict, setsubdistrict] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [link, setlink] = useState("");

  useEffect(() => {
    console.log(id);
    alert("หากต้องการ save as PDF ให้กดปุ่ม Ctrl + P");
    Axios.get("http://localhost:3001/projectID", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        const userData = response.data;
        console.log(userData);
        setproject_type(userData.project_type);
        setroom_type(userData.room_type);
        setproject_name(userData.project_name);
        setsq_meter(userData.sq_meter);
        setetc(userData.etc);
        setdate(userData.dayofavaliable);
        settime(userData.timeofavaliable);
        setstart_date(userData.start_date);
        setaddress(userData.address);
        setprovinces(userData.provinces);
        setdistrict(userData.district);
        setsubdistrict(userData.subdistrict);
        setzipcode(userData.zipcode);
        setlink(userData.google_maps)
      })
      .catch((error) => {
        // Handle any network or server errors here
        console.error("Error fetching user data: ", error);
        // You might want to display a user-friendly error message to the user
      });

    Axios.get("http://localhost:3001/userprofile", {
      params: {
        phone_number: phone_number,
      },
    })
      .then((response) => {
        const userData = response.data;
        console.log(userData);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
      })
      .catch((error) => {
        // Handle any network or server errors here
        console.error("Error fetching user data: ", error);
        // You might want to display a user-friendly error message to the user
      });
  }, []);

  return (
    <Document>
      <Page size="A4" className="page">
        <View className="section">
        <p style={{ fontSize: 16,marginRight: 10,color: "#e1e1e1" }}>
                รหัสใบงาน : {id}
              </p>
          <div className="Header">
            <img
              src={logo}
              style={{ width: 160, height: 50, marginRight: 10, marginTop: 10 }}
            />
            <Text style={{ marginTop: 20, fontSize: 20 }}>
              แบบฟอร์มการสร้าง โครงการก่อสร้าง
            </Text>
          </div>

          <br />
          <br />
          <div className="word">
            <div className="column">
              <p style={{ fontSize: 16 }}>
                ชื่อ - นามสกุลผู้ว่าจ้าง : {firstName} {lastName}
              </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>เบอร์โทรติดต่อ : {phone_number} </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>
                กำหนดการเริ่มโครงการ : {start_date}
              </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>ช่วงเวลาที่สะดวกในการติดต่อ : </p>
              <p style={{ fontSize: 16 }}>วัน : {date}</p>
              <p style={{ fontSize: 16 }}>เวลา : {time}</p>
            </div>
          </div>
          <hr
                  style={{
                    height: "20px",
                  }}
                ></hr>
          <hr className="line"></hr>
          <hr
                  style={{
                    height: "20px",
                  }}
                ></hr>
          <div className="word">
            <div className="column">
              <p style={{ fontSize: 16 }}>ประเภทโครงการ : {project_type}</p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>ประเภทห้อง : {room_type} </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>
                ชื่อโครงการที่อยู่อาศัย : {project_name}
              </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>พื้นที่ต่อตารางเมตร : {sq_meter} </p>
            </div>
            <div className="column">
            <p style={{ fontSize: 16 }}>{provinces} , {district} , {subdistrict}</p>
            <p style={{ fontSize: 16 }}>รหัสไปรษณีย์ : {zipcode}  </p>
              <p style={{ fontSize: 16 }}>ที่อยู่ : {address} </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>Google Maps Link : {link} </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>รายละเอียดเพิ่มเติม : {etc} </p>
            </div>
          </div>
        </View>
      </Page>
    </Document>
  );
};

// const PDFViewerComponent = () => (
//   <PDFViewer style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
//     <img
//               src={logo}
//               style={{ width: 160, height: 50, marginRight: 10, marginTop: 10 }}
//             />
//     <MyDocument />
//   </PDFViewer>
// );

export default MyDocument;
