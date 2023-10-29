import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import './oneForAllLittleFooter.css'
import 'font-awesome/css/font-awesome.min.css';
import { FaFacebook ,FaLine, FaTiktok, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function oneForAllLittleFooter(){
    return(
        <>
            <div className='littleFooterForU'>
                <ul>
                    <li>
                        <p>นโยบานการใช้งาน</p>
                    </li>
                    <li>
                        <p>ติดต่อสอบถาม</p>
                    </li>
                    <li>
                        <p>เงื่อนไขการใช้งาน</p>
                    </li>
                </ul>
                <p className='littleFooterCopyright'>Copyright © 2023 BAANISM Co., Ltd. All rights reserved.</p>
            </div>
        </>
    )
}