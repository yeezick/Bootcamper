import { useSelector } from 'react-redux';
// assets
import { ShowPortfolioProjects } from '../../components/Projects/PortfolioCard/PortfolioCard';
import './UserProfile.scss';

export const UserProfile = () => {
  const { user } = useSelector((state) => state.ui);

  console.log('user', user);
  const validUrl = `http://${user.portfolio_link}`;

  return (
    <div className="user-profile">
      <div className="title-wrapper">
        <h2 className="title-name">
          {user.first_name} {user.last_name}
        </h2>
        <h2 className="title-role">{user.role}</h2>
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
};
