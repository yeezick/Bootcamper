import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// components
import { ShowPortfolioProjects } from '../../components/Projects/PortfolioCard/PortfolioCard';
import { EditProfile } from '../EditProfile/EditProfile';
// assets
import './UserProfile.scss';
import { BiPencil } from 'react-icons/bi';
import { BsBriefcaseFill, BsGithub, BsLinkedin } from 'react-icons/bs';
import { SiMaildotru } from 'react-icons/si';
import { uiActions } from '../../services/redux/slices/uiSlice';
import { getOneUser } from '../../services/api/users';

export const UserProfile = () => {
  const { user: reduxUser, editMode } = useSelector((state) => state.ui);
  const [currUser, setCurrUser] = useState({
    about: '',
    email: '',
    first_name: '',
    fun_fact: '',
    last_name: '',
    portfolio_link: '',
    role: '',
  });
  const dispatch = useDispatch();
  const params = useParams();
  const validUrl = `http://${reduxUser.portfolio_link}`;
  const { about, email, fun_fact, first_name, last_name, role } = currUser;

  useEffect(() => {
    const setUser = async () => {
      if (params.id === reduxUser._id) {
        setCurrUser(reduxUser);
      } else {
        const res = await getOneUser(params.id);
        setCurrUser(res);
      }
    };
    setUser();
  }, [params]);

  const handleToggleMode = () => {
    dispatch(uiActions.toggleEditMode());
  };

  const sendEmail = () => (window.location = `mailto:${email}`);
  const routeToPortfolio = () => window.open(validUrl, '_blank');

  const AboutUser = () => <p>{about}</p>;
  const FunFact = () => <p>{fun_fact}</p>;

  if (editMode) {
    return (
      <>
        <button onClick={handleToggleMode}>back to profile</button>
        <EditProfile currUser={currUser} />
      </>
    );
  } else {
<<<<<<< HEAD
    return (
      <div className="user-profile">
        <header>Profile</header>
        <div className="contact">
          <div className="contact-left">
            <div className="toggle-edit">
              <BiPencil size={25} onClick={handleToggleMode} />
            </div>
            <div className="image"></div>
          </div>

          <div className="contact-right">
            <div>
              <p className="name">
                {first_name} {last_name}
              </p>
              <p className="role">{role}</p>
            </div>
            <div className="media">
              <SiMaildotru style={{ cursor: 'pointer' }} size={30} onClick={sendEmail} />
              <BsLinkedin style={{ cursor: 'pointer' }} size={25} />
              <BsBriefcaseFill style={{ cursor: 'pointer' }} size={25} onClick={routeToPortfolio} />
            </div>
          </div>
        </div>

        <InfoCard header="about user" children={<AboutUser />} />
        <InfoCard header="fun fact" children={<FunFact />} />
        <InfoCard header="portfolio" children={<ShowPortfolioProjects currUser={currUser} />} />
      </div>
    );
  }
};

const InfoCard = ({ children, header }) => {
  return (
    <div className="info-card">
      <h4>{header}</h4>
      {children}
    </div>
  );
};
