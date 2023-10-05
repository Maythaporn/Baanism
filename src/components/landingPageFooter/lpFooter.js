import logo from './../../assets/images/logo-footer.png';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import './lpFooter.css'
import 'font-awesome/css/font-awesome.min.css';
import { FaFacebook ,FaLine, FaTiktok, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function lpFooter(){
    return(
        <>
            <div className='footerLP'>
                <Link to="/">
                    <img src={logo} alt="baanism-logo" className="logoStyle" />
                </Link>
                <div className='iconBtn'>
                    <a href="https://www.facebook.com/BAANISM" target="_blank" rel="noopener noreferrer">
                        <FaFacebook color="white" size={40} />
                    </a>
                    <a href="https://lin.ee/dKPfd2C2" target="_blank" rel="noopener noreferrer">
                        <FaLine color="white" size={40}/>
                    </a>
                    <a href="https://www.tiktok.com/@baanism" target="_blank" rel="noopener noreferrer">
                        <FaTiktok color="white" size={40}/>
                    </a>
                    <a href="mailto:contact.baanism@gmail.com" target="_blank" rel="noopener noreferrer">
                        <FaEnvelope color="white" size={40}/>
                    </a>
                    <a href="tel:+66850556352" target="_blank" rel="noopener noreferrer">
                        <FaPhone color="white" size={40}/>
                    </a>
                </div>
                <p className='address'>23/198 คณาสิริ รังสิตคลอง 2 ถ.เสมาฟ้าคราม ต.คูคต อ.ลําลูกกา ปทุมธานี 12130 ประเทศไทย (+66) 085-055-6352</p>
                <p className='copyright'>Copyright © 2023 BAANISM Co., Ltd. All rights reserved.</p>
            </div>
        </>
    );
}