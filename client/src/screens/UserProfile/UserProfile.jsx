import { useDispatch, useSelector } from 'react-redux';
// components
import { ShowPortfolioProjects } from '../../components/Projects/PortfolioCard/PortfolioCard';
import { EditProfile } from '../EditProfile/EditProfile';
// assets
import { uiActions } from '../../services/redux/slices/uiSlice';
import './UserProfile.scss';

export const UserProfile = () => {
  const { user, toggleEditUser } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const validUrl = `http://${user.portfolio_link}`;

  const handleToggleMode = () => {
    dispatch(uiActions.toggleEditUser());
  };

  if (toggleEditUser) {
    return (
      <>
        <h2 onClick={handleToggleMode}>X</h2>
        <EditProfile />
      </>
    );
  } else {
    return (
      <div className="user-profile">
        <div className="title-wrapper">
          <h2 className="title-name">
            {user.first_name} {user.last_name}
          </h2>
          <h2 className="title-role">{user.role}</h2>
          <h2 onClick={handleToggleMode}>X</h2>
        </div>
        <div className="image">im an image</div>

        <div className="links">
          <a href={`mailto:${user.email}`} target="">
            E-mail
          </a>
          <a href={validUrl} target="_blank">
            Portfolio
          </a>
        </div>

        <div className="content">
          <div className="about">
            <h3>About</h3>
            <p>{user.about}</p>
          </div>

          <div className="fun-fact">
            <h3>Fun Fact</h3>
            <p>{user.fun_fact}</p>
          </div>
        </div>

        <ShowPortfolioProjects />
      </div>
    );
  }
};
