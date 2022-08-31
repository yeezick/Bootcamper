import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AddPortfolioProject,
  ShowPortfolioProjects,
} from '../../components/Projects/PortfolioCard/PortfolioCard';
import { CreateProfileForm } from '../../components/Form/CreateProfileForm';


import { uiActions } from '../../services/redux/slices/uiSlice';
import { updateUser } from '../../services/api/users';
import { createProfileForm } from '../../services/formData';
import './CreateProfile.scss';
import { useEffect } from 'react';

//CreateUserProfile

export const CreateProfile = ({ currUser }) => {
  const header = {
    text: "Before you can create or join a project, we'll need to finish your profile first.",
    title: 'About You',
  };

  return (
    <>
      <div className="create-profile">
        {/* <Header headerTitle={header.title} headerText={header.text} /> */}
        <h3>Create Profile</h3>
        <CreateUserProfile />
        {/* <AddPortfolioProject /> */}
        <ShowPortfolioProjects currUser={currUser} />
        <Link to="/roulette">
          <a className="complete-later">Complete later</a>
        </Link>
      </div>
    </>
  );
};

const CreateUserProfile = () => {
  const { editMode, user } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    role: '',
    about: '',
    fun_fact: '',
    portfolio_link: '',
  });

  useEffect(() => {
    if (editMode) {
      const { role, about, fun_fact, portfolio_link } = user;
      setUserInfo({
        role,
        about,
        fun_fact,
        portfolio_link,
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
    <div className="create-user">
      <CreateProfileForm
        formData={createProfileForm}
        formState={[userInfo, setUserInfo, handleUserUpdate]}
      />
    </div>
  );
};
