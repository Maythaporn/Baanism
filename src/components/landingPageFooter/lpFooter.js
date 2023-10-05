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
                    <Link>
                        <FaFacebook color="white" size={40}/>
                    </Link>
                    <FaLine color="white" size={40}/>
                    <FaTiktok color="white" size={40}/>
                    <FaEnvelope color="white" size={40}/>
                    <FaPhone color="white" size={40}/>
                </div>
                <p className='address'>23/198 คณาสิริ รังสิตคลอง 2 ถ.เสมาฟ้าคราม ต.คูคต อ.ลําลูกกา ปทุมธานี 12130 ประเทศไทย (+66) 085-055-6352</p>
                <p className='copyright'>Copyright © 2023 BAANISM Co., Ltd. All rights reserved.</p>
            </div>
        </>
    );
}