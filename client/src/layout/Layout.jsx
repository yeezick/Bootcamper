import { useState } from "react";
import MobileMenu from "./MobileMenu/MobileMenu";
import Nav from "./Nav/Nav";
import './Layout.scss'

const Layout = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log('clicked');
  };

  return (
    <div className='responsive-wrapper'>
      <div className='layout-container'>
        <Nav toggle={toggle} />
        <MobileMenu isOpen={isOpen} toggle={toggle} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
