import './Nav.scss'

const Nav = ({toggle}) => {
  return (
    <div className="nav-container">
    <div className="logo">Bootcamper</div>
    <div className="menu-btn" onClick={toggle}>
    <i></i>
    <i></i>
    <i></i>
    </div>

    </div>
  );
};

export default Nav;
