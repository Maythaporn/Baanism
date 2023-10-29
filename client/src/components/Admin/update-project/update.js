import { useEffect, useState } from 'react'
import './update.css'
import Axios from 'axios'

const UpdateProjects = () => {
    const [data, setData] = useState([])
    // const data = [
    //     { id: 1, title: "ไม้ฝา เฌอร่า คืออะไร?" },
    //     { id: 2, title: "ไม้ฝา เฌอร่า คืออะไร?" },
    // ]

    useEffect(() => {
        Axios.get('http://localhost:3001/homecontent')
            .then((response) => {
                setData(response.data)
                // console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const deleteContent = (id) => {
        Axios.delete(`http://localhost:3001/deletecontent/${id}`).then((response) => {
            setData(
                data.filter((val) => {
                    return val.id != id
                })
            )
        })
    }

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("คุณแน่ใจที่ต้องการลบหรือไม่?");
        if (isConfirmed) {
            deleteContent(id)
        }
      }

    return (
        <>
            {data.map((e) => (
                <div className="admin-updateproject-container" key={e.id}>
                    <div className='info-left'>
                        <p className='project-title'>{e.title}</p>
                    </div>
                    <div className='info-right'>
                        <div className='edit'>
                            <button className='edit-btn'>แก้ไขข้อมูล</button>
                            <span className='space'>|</span>
                            <button className='edit-btn' onClick={() => { handleDelete(e.id) }}>ลบ Content</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}


export default UpdateProjects