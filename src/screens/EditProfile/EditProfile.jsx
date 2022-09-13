import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AddPortfolioProject,
  ShowPortfolioProjects,
} from '../../components/Projects/PortfolioCard/PortfolioCard';
import { Form } from '../../components/Form/Form';
import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';

import { uiActions } from '../../services/redux/slices/uiSlice';
import { updateUser } from '../../services/api/users';
import { userForm } from '../../services/formData';
import './EditProfile.scss';
import { FaPen } from 'react-icons/fa';
import { useEffect } from 'react';

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
            <FaPen size={15} />
          </div>
          <div className="image"></div>

          <AboutUser />
          <AddPortfolioProject />
          <ShowPortfolioProjects currUser={currUser} />
          <Link to="/roulette">
            <button>Start Collaborating!</button>
          </Link>
        </div>
      </div>
    </>
  );
};

const AboutUser = () => {
  const { editMode, user } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
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

  return (
    <div className="about-user">
      <Form formData={userForm} formState={[userInfo, setUserInfo, handleUserUpdate]} />
    </div>
  );
};
