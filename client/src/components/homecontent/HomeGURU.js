import React, { useEffect, useState } from "react";
import "./HomeGURU.css";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

function Intro() {
  const [content, setContent] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/homecontent')
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="HomeGURUContainer">
      <h2 className="HomeGURUContent">ความรู้เรื่องต่อเติมบ้าน</h2>
      <div className="content">
        {content.map((val) => {
          return (
            <div className="content-info" key={val.id} onClick={() => { navigate(`/homecontent/${val.id}`) }}>
              <img src={val.img} alt={val.title} />
              <h3>{val.title}</h3>
              <pre>{val.caption}</pre>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Intro;
