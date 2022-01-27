import { Link } from "react-router-dom";
import "./MobileMenu.scss";


const MobileMenu = ({ isOpen }) => {
  return (
    <div
      className={
        isOpen ? "mobile-menu-container active " : "mobile-menu-container"
      }
    >

        <div className="mobile-menu">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/projects/1">
            Projects
          </Link>
          <Link className="nav-link" to="/projects/i/edit">
            Project edit
          </Link>
          <Link className="nav-link" to="/roulette">
            roulette
          </Link>
          <Link className="nav-link" to="/sign-in">
            sign-in
          </Link>
          <Link className="nav-link" to="/sign-up">
            sign-up
          </Link>
          <Link className="nav-link" to="/users/1">
            users
          </Link>
          <Link className="nav-link" to="/users/1/edit">
            users edit
          </Link>
        </div>

    </div>
  );
};

export default MobileMenu;
