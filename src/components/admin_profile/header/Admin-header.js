import React, { useState } from 'react';
import './Header.css';
import logo from './logo-header.png';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`topnav ${mobileMenuOpen ? 'responsive' : ''}`}>
      <Link to="/">
        <img src={logo} alt="baanism-logo" className="headerLogo" />
      </Link>
      <Link to="/about">เกี่ยวกับเรา</Link>
      <Link to="/news">Home GURU Content</Link>
      <Link to="/contact">ประเมินราคา</Link>
      <Link to="/about">ติดต่อเรา</Link>
      <div className="icon" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
}
