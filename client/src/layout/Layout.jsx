import { useState } from "react";
import MobileMenu from "./MobileMenu/MobileMenu";
import Nav from "./Nav/Nav";
import "./layout.css";


const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='responsive-wrapper'>
      <div className="layout-container">
        <div className="nav-container">
          <Nav />
        </div>
        <div className="mobile-menu-container">
          <MobileMenu toggle={toggle} isOpen={isOpen} />
        </div>
        <div className="layout-wrapper">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
