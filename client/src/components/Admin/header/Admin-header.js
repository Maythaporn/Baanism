import logo from './logo-header.png';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaBell, FaUser } from 'react-icons/fa'

export default function Header() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };
  const btnLD = (event) => {
    window.location.href = '/';
  }
  const btnHomeguru = (event) => {
    window.location.href = '/homecontent';
  }
  const btnAbout = (event) => {
    window.location.href = '/about';
  }
  const btnEstimate = (event) => {
    window.location.href = '/estimate';
  }
  const btnContact = (event) => {
    window.location.href = '/Contact';
  }
  const btnAdmin = (event) => {
    window.location.href = '/admin';
  }

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
              <button onClick={btnAbout}>เกี่ยวกับเรา</button>
            </li>
            <li>
              <button onClick={btnHomeguru}>Home GURU Content</button>
            </li>
            <li>
              <button onClick={btnEstimate}>ประเมินราคา</button>
            </li>
            <li>
              <button onClick={btnContact}>ติดต่อเรา</button>
            </li>
            <li>
            <button onClick={btnAdmin}>
                <FaBell size={20} color="gray" />
              </button>
            </li>
            <li>
              <button onClick={btnAdmin}>
                <FaUser size={20} color="gray" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}