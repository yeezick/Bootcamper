import { useState } from "react";
import MobileMenu from "./MobileMenu/MobileMenu";
import Nav from "./Nav/Nav";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(falase);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
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
