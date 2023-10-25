import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import logo from "./../../../assets/images/logo-header.png";
import "./page.css";
import Axios from "axios";

const MyDocument = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { phone_number, id } = useParams();

  const [project, setProject] = useState([]);

  useEffect(() => {
    console.log(id);
    Axios.get("http://localhost:3001/projectPDF", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        setProject(response.data);
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
                ชื่อ - นามสกุลผู้ว่าจ้าง: {firstName} {lastName}
              </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>เบอร์โทรติดต่อ : {phone_number} </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>
               ประเภทโครงการโครงการ: {project}
              </p>
            </div>
            <div className="column">
              <p style={{ fontSize: 16 }}>เบอร์โทรติดต่อ : {phone_number} </p>
            </div>
          </div>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
