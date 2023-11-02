import logo from './logo-header.png';
import './login_header.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaBell, FaUser } from 'react-icons/fa'

export default function Header() {
    const phoneNumber = localStorage.getItem('phone');
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    const btnAbout = () => {
        window.location.href = '/about'
    };
    const btnHomeguru = () => {
        window.location.href = '/homecontent'
    }
    const btnContact = () => {
        window.location.href = '/contact'
    }
    const btnEstimate = () => {
        window.location.href = '/contact'
    }


    const closeNav = () => {
        setIsNavOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 769) {
                closeNav(); // Close the navigation when the screen size is 769px or more
            }
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <nav className={`navbar ${isNavOpen ? 'active' : ''}`}>
                <Link to="/">
                    <img src={logo} alt="baanism-logo" className="logoStyle" />
                </Link>

                <div className="nav-toggle" onClick={toggleNav}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                <div className={`nav-links ${isNavOpen ? 'open' : ''}`}>
                    <ul className='navBar'>


                        <button className="btn_header_login" onClick={btnAbout}>เกี่ยวกับเรา</button>
                        <button className="btn_header_login" onClick={btnHomeguru}>Home GURU Content</button>
                        <button className="btn_header_login" onClick={btnEstimate}>ประเมินราคา</button>
                        <button className="btn_header_login" onClick={btnContact}>ติดต่อเรา</button>
                        <div className='user_icon_login'>
                        <Link to={'/user_profile/' + phoneNumber}>
                            <FaBell size={20} color="gray" />
                        </Link>

                        <Link to={'/user_profile/' + phoneNumber}>
                            <FaUser size={20} color="gray" />
                        </Link> 
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    );
}