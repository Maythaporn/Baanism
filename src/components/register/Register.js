import './Register.css'
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

export default function Register(){
    const navigate = useNavigate();
  
    const btnConfirm = () => {
        navigate('/Confirm'); // put ur page after /
    }

    return(
        <>
            <h1>register page</h1>
            <button className='solidButton' onClick={btnConfirm} >
                สมัครสมาชิก
            </button>
        </>
    );
}