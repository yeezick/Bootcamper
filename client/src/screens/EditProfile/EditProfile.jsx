import { useState } from 'react';
import {
  AddPortfolioProject,
  ShowPortfolioProjects,
} from '../../components/Projects/PortfolioCard/PortfolioCard';
import { Form } from '../../components/Form/Form';
import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';

import { updateUser } from '../../services/api/users';
import { userForm } from '../../services/formData';
import './EditProfile.scss';

export const EditProfile = () => {
  const [showModal, setShowModal] = useState(true);
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
        <ShowPortfolioProjects />
        <button>Update Profile</button>
      </div>
    </>
  );
};

const AboutUser = () => {
  const [userInfo, setUserInfo] = useState({
    about: '',
    fun_fact: '',
    portfolio_link: '',
    role: '',
  });

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser('61f32730ecf7c67c9bee9f36', userInfo);
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
