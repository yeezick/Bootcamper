import React from "react";
import {FaBars} from 'react-icons/fa'
const Nav = () => {
  return (
    <nav classNam='nav-container'>
    <div className="logo">Bootcamper</div>
    <div className="menu-bars">
    <FaBars />
    </div>
    </nav>

  )
};

export default Nav;
