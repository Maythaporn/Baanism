import Axios from 'axios';
import './ContentInfo.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContentInfo = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const [info, setInfo] = useState("")

    useEffect(() => {
        Axios.get(`http://localhost:3001/homecontent/${id}`)
            .then((response) => {
                console.log(response.data)
                setTitle(response.data.title)
                setImg(response.data.img)
                setInfo(response.data.info)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <>
            <div className="content-full">
                <h2>{title}</h2>
                <img src={'http://localhost:3001/images/'+img} alt={title} />
                <pre>{info}</pre>
            </div>
        </>
    )
}

export default ContentInfo