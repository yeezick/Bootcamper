import './Nav.scss';

const Nav = ({ toggleMobileMenu }) => {
  return (
    <div className="nav-container">
      <div className="logo">Bootcamper</div>
      <div className="menu-btn" onClick={toggleMobileMenu}>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  );
};

export default Nav;
