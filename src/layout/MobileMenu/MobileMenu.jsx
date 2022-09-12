import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { uiActions } from '../../services/redux/slices/uiSlice';
import './MobileMenu.scss';

const MobileMenu = ({ isOpen, toggleMobileMenu }) => {
  const { _id: userId } = useSelector((state) => state.ui.user);
  const dispatch = useDispatch();

  const toggleEditMode = () => {
    dispatch(uiActions.toggleEditMode());
    toggleMobileMenu();
  };

  return (
    <div className={isOpen ? 'mobile-menu-container active ' : 'mobile-menu-container'}>
      <div className="mobile-menu">
        <Link className="nav-link" to="/" onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link className="nav-link" to="/dashboard" onClick={toggleMobileMenu}>
          Dashboard
        </Link>
        <Link className="nav-link" to="/projects/create" onClick={toggleMobileMenu}>
          Create Project
        </Link>
        <Link className="nav-link" to="/roulette" onClick={toggleMobileMenu}>
          Roulette
        </Link>
        <Link className="nav-link" to="/sign-in" onClick={toggleMobileMenu}>
          Sign In
        </Link>
        <Link className="nav-link" to="/sign-up" onClick={toggleMobileMenu}>
          Sign Up
        </Link>
        <Link className="nav-link" to={`/users/${userId}`} onClick={toggleMobileMenu}>
          My Profile
        </Link>
        <Link className="nav-link" to={`/users/${userId}/create`} onClick={toggleEditMode}>
          Create Profile
        </Link>
        <Link className="nav-link" to={`/users/${userId}/edit`} onClick={toggleEditMode}>
          Edit My Profile
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
