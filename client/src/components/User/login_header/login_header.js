import logo from './logo-header.png';
import './login_header.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { FaBell, FaUser } from 'react-icons/fa'

import Axios from "axios";

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

    const [firstname, setFirstname] = useState("");
    Axios.get("http://localhost:3001/userprofile", {
        params: {
        phone_number: phoneNumber,
        },
    })
        .then((response) => {
        const userData = response.data;
        console.log(userData);
        console.log("success");
        setFirstname(userData.first_name);
        })
        .catch((error) => {
        // Handle any network or server errors here
        console.error("Error fetching user data: ", error);
        // You might want to display a user-friendly error message to the user
        });

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

                <div className={`navUser-links ${isNavOpen ? 'open' : ''} posNavUser` }>
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
                        <div className='user_icon_login' >
                            {/* <div className='user_icon_login' style={{alignItems:'center'}}> */}
                                {/* <ul className='navBarUser'> */}
                                    <li>
                                        <div style={{display:"flex", flexDirection: "row", alignItems:"center"}}>
                                            <Link to={'/user_profile/' + phoneNumber}>
                                                <FaUser size={30} color="#03128E" />
                                            </Link>
                                            <p className='userNameNaJa'>{firstname}</p>
                                        </div>
                                    </li>
                                {/* </ul> */}
                            </div>
                    
                    </div>
                </div>
            </nav>
        </>
    );
}