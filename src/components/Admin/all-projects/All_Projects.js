import './All_Projects.css'

const AllProjects = () => {
    const data = [
        { id: 1, title: "ต่อเติม", type: "", address: "หมู่บ้าน , เขต/อำเถอ , จังหวัด , รหัสไปรษณี" },
        { id: 2, title: "ต่อเติม", type: "", address: "หมู่บ้าน , เขต/อำเถอ , จังหวัด , รหัสไปรษณี" },
        { id: 3, title: "ต่อเติม", type: "", address: "หมู่บ้าน , เขต/อำเถอ , จังหวัด , รหัสไปรษณี" },
        { id: 4, title: "ต่อเติม", type: "", address: "หมู่บ้าน , เขต/อำเถอ , จังหวัด , รหัสไปรษณี" },
    ]
    return (
        <>
            {data.map((e) => (
                <div className="admin-project-container" key={e.id}>
                    <div className='info-left'>
                        <p className='project-title'>{e.title}</p>
                        <p>ประเภทห้อง : {e.type}</p>
                        <p>สถานที่ : {e.address}</p>
                    </div>
                    <div className='info-right'>
                        <p>สถานะ : <span class="status"></span>รอการติดต่อกลับ</p>
                        <div className='edit'>
                            <button className='edit-btn'>แก้ไขข้อมูล</button>
                            <span className='space'>|</span>
                            <button className='edit-btn'>ลบโครงการ</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AllProjects