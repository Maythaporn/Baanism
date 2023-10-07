import './Gallery.css'
import gallery1 from '../../assets/images/gallery1.png'
import gallery2 from '../../assets/images/gallery2.png'
import gallery3 from '../../assets/images/gallery3.png'
import gallery4 from '../../assets/images/gallery4.png'
import gallery5 from '../../assets/images/gallery5.png'
import gallery6 from '../../assets/images/gallery6.png'
import gallery7 from '../../assets/images/gallery7.png'
import gallery8 from '../../assets/images/gallery8.png'

const Gallery = () => {
    return (
        <>
            <h2 className='title-gallery'>ผลงานที่ผ่านมา</h2>
            <div className="gallery">
                <div className='box'><img src={gallery1} alt='baanism past work' /></div>
                <div className='box'><img src={gallery2} alt='baanism past work' /></div>
                <div className='box'><img src={gallery3} alt='baanism past work' /></div>
                <div className='box'><img src={gallery4} alt='baanism past work' /></div>
                <div className='box'><img src={gallery8} alt='baanism past work' /></div>
                <div className='box'><img src={gallery5} alt='baanism past work' /></div>
                <div className='box'><img src={gallery6} alt='baanism past work' /></div>
                <div className='box'><img src={gallery7} alt='baanism past work' /></div>
            </div>
        </>

    )
}

export default Gallery