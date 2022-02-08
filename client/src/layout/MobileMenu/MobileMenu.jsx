import { Link } from 'react-router-dom';
import './MobileMenu.scss';

const MobileMenu = ({ isOpen, toggleMobileMenu }) => {
  return (
    <div className={isOpen ? 'mobile-menu-container active ' : 'mobile-menu-container'}>
      <div className="mobile-menu">
        <Link className="nav-link" to="/" onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link className="nav-link" to="/projects/1" onClick={toggleMobileMenu}>
          Projects
        </Link>
        <Link className="nav-link" to="/projects/i/edit" onClick={toggleMobileMenu}>
          Project edit
        </Link>
        <Link className="nav-link" to="/roulette" onClick={toggleMobileMenu}>
          roulette
        </Link>
        <Link className="nav-link" to="/sign-in" onClick={toggleMobileMenu}>
          sign-in
        </Link>
        <Link className="nav-link" to="/sign-up" onClick={toggleMobileMenu}>
          sign-up
        </Link>
        <Link className="nav-link" to="/users/1" onClick={toggleMobileMenu}>
          users
        </Link>
        <Link className="nav-link" to="/users/1/edit" onClick={toggleMobileMenu}>
          users edit
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
