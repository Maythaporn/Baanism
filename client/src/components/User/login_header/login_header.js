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
        window.location.href = '/estimate'
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
            <nav className={`rootNavUser${isNavOpen ? 'active' : ''}`}>
                <Link to="/">
                    <img src={logo} alt="baanism-logo" className="logoStyle" />
                </Link>

                <div className="navUser-toggle" onClick={toggleNav}>
                    <div className="barUser"></div>
                    <div className="barUser"></div>
                    <div className="barUser"></div>
                </div>

                <div className={`navUser-links ${isNavOpen ? 'open' : ''}`}>
                    <div className='leftButton'>
                        <ul className='navBarUser'>
                            <li>
                                <button className="btn_header_login" onClick={btnAbout}>เกี่ยวกับเรา</button>
                            </li>
                            <li>
                                <button className="btn_header_login" onClick={btnHomeguru}>Home GURU Content</button>
                            </li>
                            <li>
                                <button className="btn_header_login" onClick={btnEstimate}>ประเมินราคา</button>
                            </li>
                            <li>
                                <button className="btn_header_login" onClick={btnContact}>ติดต่อเรา</button>
                            </li>
                        </ul>
                    </div>
                    <div className='rightButton' >
                            <div className='user_icon_login' style={{alignItems:'center'}}>
                                <li>
                                    <Link to={'/user_profile/' + phoneNumber}>
                                        <FaUser size={30} color="#03128E" />
                                    </Link>
                                </li>
                            </div>
                    
                    </div>
                </div>
            </nav>
        </>
    );
}