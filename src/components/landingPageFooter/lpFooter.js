import logo from './../../assets/images/logo-footer.png';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import './lpFooter.css'
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function lpFooter(){
    return(
        <>
            <div className='footerLP'>
                <Link to="/">
                    <img src={logo} alt="baanism-logo" className="logoStyle" />
                </Link>
                <div className='iconBtn'>
                    <FontAwesomeIcon icon="fa-brands fa-facebook" />
                    
                    <FontAwesomeIcon icon="fa-brands fa-tiktok" />
                    <FontAwesomeIcon icon="fa-solid fa-envelope" />
                    <FontAwesomeIcon icon="fa-solid fa-phone" />
                    <h2>h2</h2>
                </div>
                <p className='address'>23/198 คณาสิริ รังสิตคลอง 2 ถ.เสมาฟ้าคราม ต.คูคต อ.ลําลูกกา ปทุมธานี 12130 ประเทศไทย (+66) 085-055-6352</p>
                <p className='copyright'>Copyright © 2023 BAANISM Co., Ltd. All rights reserved.</p>
            </div>
        </>
    );
}