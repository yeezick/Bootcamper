import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// components
import { ShowPortfolioProjects } from '../../components/Projects/PortfolioCard/PortfolioCard';
import { EditProfile } from '../EditProfile/EditProfile';
// assets
import { uiActions } from '../../services/redux/slices/uiSlice';
import './UserProfile.scss';
import { getOneUser } from '../../services/api/users';
import { Header } from '../../components/Header/Header';

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
  const AboutUser = () => <p>{currUser.about}</p>;
  const FunFact = () => <p>{currUser.fun_fact}</p>;

  if (editMode) {
    return (
      <>
        <button onClick={handleToggleMode}>back to profile</button>
        <EditProfile currUser={currUser} />
      </>
    );
  } else {
    const { about, email, fun_fact, first_name, last_name, role, _id: currUserId } = currUser;
    return (
      <div className="user-profile">
        <header>PROFILE</header>
        <div className="contact">
          <p>
            EDIT <br /> PENCIL
          </p>
          <p>IMAGE</p>
          <p>FIRST/LAST NAME</p>
          <p>TITLE</p>
          <div className="media">
            <div>X</div>
            <div>X</div>
            <div>X</div>
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
