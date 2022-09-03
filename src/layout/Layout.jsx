import { useState } from 'react';
import MobileMenu from './MobileMenu/MobileMenu';
import Nav from './Nav/Nav';
import './Layout.scss';

const Layout = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="responsive-wrapper">
      <div className="layout-container">
        <Nav toggleMobileMenu={toggleMobileMenu} />
        <MobileMenu isOpen={isOpen} toggleMobileMenu={toggleMobileMenu} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
