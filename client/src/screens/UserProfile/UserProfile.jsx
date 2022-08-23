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

export const UserProfile = () => {
  const { user: reduxUser, editMode } = useSelector((state) => state.ui);
  const [currUser, setCurrUser] = useState({
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    about: '',
    fun_fact: '',
    portfolio_link: '',
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
        <h3 className="header">Profile</h3>
        <div className="image">im an image</div>
        <div className="title-wrapper">
          {currUserId === reduxUser._id && <button onClick={handleToggleMode}>edit profile</button>}
          <h2 className="title-name">
            {first_name} {last_name}
          </h2>
          <h2 className="title-role">{role}</h2>
        </div>
        {/*
        <div className="links">
          <a href={`mailto:${email}`} target="">
            E-mail
          </a>
          <a href={validUrl} target="_blank">
            Portfolio
          </a>
        </div>
        */}
        <div className="content">
          <div className="about">
            <h3>About</h3>
            <p>{about}</p>
          </div>

          {fun_fact && (
            <div className="fun-fact">
              <h3>Fun Fact</h3>
              <p>{fun_fact}</p>
            </div>
          )}
        </div>

        <ShowPortfolioProjects currUser={currUser} />
      </div>
    );
  }
};
