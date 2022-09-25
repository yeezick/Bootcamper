import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AddPortfolioProject,
  ShowPortfolioProjects,
} from '../../components/Projects/PortfolioCard/PortfolioCard';
import { EditProfileForm } from './EditProfileForm';
import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';

import { uiActions } from '../../services/redux/slices/uiSlice';
import { updateUser } from '../../services/api/users';
import { userForm } from '../../services/formData';
import './EditProfile.scss';
import { HiPencil } from 'react-icons/hi';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import parseHtml from 'html-react-parser';
import { handleChange } from '../../services/utils/formHandlers';

export const EditProfile = ({ currUser }) => {
  const header = {
    title: 'Edit Profile',
  };

  return (
    <>
      <div className="edit-profile">
        <Header headerTitle={header.title} />
        <div className="profile-picture">
          <div className="toggle-edit-mode">
            <HiPencil size={22} />
          </div>
          <div className="image"></div>
          {/* Temporary code, a guest user would not be able to view this screen. */}
          {currUser ? (
            <p className="currUser">
              {currUser.first_name} {currUser.last_name}
            </p>
          ) : (
            <p className="currUser">First, Last</p>
          )}
          <AboutUser />
          <AddPortfolioProject />
          <ShowPortfolioProjects currUser={currUser} />
        </div>
      </div>
    </>
  );
};

const AboutUser = () => {
  const { editMode, user } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { _id: userId } = useSelector((state) => state.ui.user);
  const [aboutCharCount, setAboutCharCount] = useState(0);
  const [factCharCount, setFactCharCount] = useState(0);
  // const [stateObject, setterFunction, handleSubmit] = formState;

  const [userInfo, setUserInfo] = useState({
    about: '',
    fun_fact: '',
    portfolio_link: '',
    role: '',
  });

  useEffect(() => {
    if (editMode) {
      const { about, fun_fact, portfolio_link, role } = user;
      setUserInfo({
        about,
        fun_fact,
        portfolio_link,
        role,
      });
    }
  }, [editMode]);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(user._id, userInfo);
      dispatch(uiActions.updateUser(res));
    } catch (error) {
      console.error(error);
    }
  };

  const showUser = () => {
    navigate(`/users/${userId}`);
  };

  const handleContent = (e) => {
    if (e.target.name === 'about') {
      setAboutCharCount(e.target.value.length);
    } else if (e.target.name === 'fun_fact') {
      setFactCharCount(e.target.value.length);
    }
  };

  return (
    <div className="about-user">
      <form className="edit-profile-form">
        <button className="submit-btn" type="submit" onClick={showUser}>
          Done
        </button>
        <div className="role-container">
          <label htmlFor="checkbox" className="label">
            I am a:
          </label>
          <label htmlFor="software">
            <div className="role">
              <input
                id="software"
                type="checkbox"
                name="role"
                // onChange={(e) => handleChange(e, 'role')}
                value="Software Developer"
              />
              Software Developer
            </div>
          </label>

          <label htmlFor="designer">
            <div className="role">
              <input
                id="designer"
                type="checkbox"
                name="role"
                // onChange={(e) => handleChange(e, 'role')}
                value="UX Designer"
              />
              UX Designer
            </div>
          </label>
        </div>
        <div className="text-container">
          <label htmlFor="about">About me</label>
          <textarea
            name="about"
            id="about"
            maxLength={250}
            onChange={(e) => {
              handleContent(e);
            }}
            required={true}
          ></textarea>
          <p>{250 - aboutCharCount}</p>

          <label htmlFor="fun_fact">
            Fun fact <small>(optional)</small>
          </label>
          <textarea
            name="fun_fact"
            id="fun_fact"
            maxLength={250}
            onChange={(e) => {
              // handleChange(e, 'about');
              handleContent(e);
            }}
            required={false}
          ></textarea>
          <p>{250 - factCharCount}</p>
        </div>
      </form>
      {/* <EditProfileForm formData={userForm} formState={[userInfo, setUserInfo, handleUserUpdate]} /> */}
    </div>
  );
};
