import React, { useEffect, useState } from "react";
import "./HomeGURU.css";
import Axios from 'axios'
import Paginate from "./Paginate";

function Intro() {
  const [content, setContent] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/homecontent')
      .then((response) => {
        setContent(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="HomeGURUContainer">
      <h2 className="HomeGURUContent">ความรู้เรื่องต่อเติมบ้าน</h2>
      <Paginate data={content} />
    </div>
  );
}

export default Intro
