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
import { useEffect } from 'react';

export const EditProfile = ({ currUser }) => {
  const [showModal, setShowModal] = useState(false);
  const header = {
    text: "Before you can create or join a project, we'll need to finish your profile first.",
    title: 'About You',
  };

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} />}
      <button onClick={() => setShowModal(!showModal)}>show modal</button>
      <div className="edit-profile">
        <Header headerTitle={header.title} headerText={header.text} />
        <AboutUser />
        <AddPortfolioProject />
        <ShowPortfolioProjects currUser={currUser} />
        <Link to="/roulette">
          <button>Start Collaborating!</button>
        </Link>
      </div>
    </>
  );
};

const AboutUser = () => {
  const { toggleEditUser, user } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    about: '',
    fun_fact: '',
    portfolio_link: '',
    role: '',
  });

  useEffect(() => {
    if (toggleEditUser) {
      const { about, fun_fact, portfolio_link, role } = user;
      setUserInfo({
        about,
        fun_fact,
        portfolio_link,
        role,
      });
    }
  }, [toggleEditUser]);
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
