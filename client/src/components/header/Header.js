import logo from './../../assets/images/logo-header.png';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function Header() {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
    };

    const btnRegister = () => {
      navigate("/register");
    };

    const btnLogin = () => {
      navigate("/login");
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

      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
          window.removeEventListener("resize", handleResize);
      };
    }, []);

  return (
    <>
      <nav className={`rootNav ${isNavOpen ? 'active' :''}`}>
        <Link to="/">
          <img src={logo} alt="baanism-logo" className="logoLandingStyle" />
        </Link>

        <div className="nav-toggle" onClick={toggleNav}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`nav-links ${isNavOpen ? 'open' : ''} posNav`}>
          <div className='leftMenu'>
            <ul className='navBar'>
              <li>
                <Link to="/about">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link to='/homecontent'>
                  Home GURU
                </Link>
              </li>
              <li>
                <Link to='/estimate'>
                  ประเมินราคา
                </Link>
              </li>
              <li>
                <Link to='/contact'>
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>
          <div className='rightMenu'>
            <ul className='navBar'>
              <li>
              <button className='lineButton' onClick={btnLogin} to='/login'>
                    ลงชื่อเข้าใช้งาน
                </button>
              </li>
              <li>
                <button className='solidButton' onClick={btnRegister} to='/register'>
                    ลงทะเบียน
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
