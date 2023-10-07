import logo from './logo-header.png';
import './User-header.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {FaBell,FaUser} from 'react-icons/fa'

export default function Header() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const btnRegister = () => {
    navigate('/register');
  };

  const btnLogin = () => {
    navigate('/login');
  };

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
            <li>
              <Link to="/about">
                เกี่ยวกับเรา
              </Link>
            </li>
            <li>
              <Link to='/homecontent'>
                Home GURU Content
              </Link>
            </li>
            <li>
              <Link to='/'>
                ประเมินราคา
              </Link>
            </li>
            <li>
              <Link to='/'>
                ติดต่อเรา
              </Link>
            </li>
            <li>
              <Link>
              <FaBell size={20} color="gray" />
              </Link>
            </li>
            <li>
              <Link>
              <FaUser size={20} color="gray" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}