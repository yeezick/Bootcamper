import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddPortfolioProject,
  ShowPortfolioProjects,
} from '../../components/Projects/PortfolioCard/PortfolioCard';
import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';

import { uiActions } from '../../services/redux/slices/uiSlice';
import { updateUser } from '../../services/api/users';
import { HiPencil } from 'react-icons/hi';
import { useEffect } from 'react';
import './EditProfile.scss';

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

  const [userInfo, setUserInfo] = useState({
    about: '',
    fun_fact: '',
    role: '',
  });

  useEffect(() => {
    if (editMode) {
      const { about, fun_fact, role } = user;
      setUserInfo({
        about,
        fun_fact,
        role,
      });
    }
  }, [editMode]);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(user._id, userInfo);
      dispatch(uiActions.updateUser(res));
      dispatch(uiActions.toggleEditMode());
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileChange = (e) => {
    const { value } = e.target;
    setUserInfo({ ...userInfo, [e.target.name]: value });
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
      <form className="edit-profile-form" onSubmit={handleUserUpdate}>
        <button className="submit-btn" type="submit">
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
                defaultChecked={userInfo.role === 'Software Developer' ? true : false}
                onChange={(e) => handleProfileChange(e)}
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
                defaultChecked={userInfo.role === 'UX Designer' ? true : false}
                onChange={(e) => handleProfileChange(e)}
                value="UX Designer"
              />
              UX Designer
            </div>
          </label>
        </div>
        <div className="text-container">
          <label htmlFor="about">About me</label>
          {console.log(userInfo)}
          <textarea
            name="about"
            id="about"
            maxLength={250}
            defaultValue={userInfo.about}
            onChange={(e) => {
              handleProfileChange(e);
              handleContent(e);
            }}
            required={true}
          ></textarea>
          <p className="charCount">{250 - aboutCharCount}</p>

          <label htmlFor="fun_fact">
            Fun fact <small>(optional)</small>
          </label>
          <textarea
            name="fun_fact"
            id="fun_fact"
            maxLength={250}
            defaultValue={userInfo.fun_fact}
            onChange={(e) => {
              handleProfileChange(e);
              handleContent(e);
            }}
            required={false}
          ></textarea>
          <p className="charCount">{250 - factCharCount}</p>
        </div>
      </form>
    </div>
  );
};
