import { useState } from 'react';
import {
  AddPortfolioProject,
  ShowPortfolioProjects,
} from '../../components/Projects/PortfolioCard/PortfolioCard';
import { Modal } from '../../components/Modal/Modal';
import './EditProfile.scss';

// make this a global function and remove
const handleChange = (e, property, setterFunction) => {
  const { value } = e.target;
  setterFunction((state) => {
    return { ...state, [property]: value };
  });
};

export const EditProfile = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} />}
      <button onClick={() => setShowModal(!showModal)}>show modal</button>
      <div className="edit-profile">
        <header>
          (header component) About You - Before you can create or join a project, we'll need to
          finish your profile first.
        </header>
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
    funFact: '',
    portfolio_link: '',
    role: '',
    user_projects: [],
  });

  return (
    <div className="about-user">
      <label>
        Tell us a bit about you <small>(max 250 characters)</small>
        <input
          type="textarea"
          max={250}
          value={userInfo.about}
          onChange={(e) => handleChange(e, 'about', setUserInfo)}
        />
      </label>

      <label>
        Include a fun fact! <small> (optional, max 250 characters)</small>
        <input
          type="texarea"
          max={250}
          value={userInfo.funFact}
          onChange={(e) => handleChange(e, 'funFact', setUserInfo)}
        />
      </label>

      <label>
        I am a...
        <select defaultValue="" onChange={(e) => handleChange(e, 'role', setUserInfo)}>
          <option value="UX designer">UX designer</option>
          <option value="Software engineer">Software Engineer</option>
        </select>
      </label>

      <label>
        Link to your portfolio <small>(optional)</small>
        <input
          type="text"
          value={userInfo.portfolio_link}
          onChange={(e) => handleChange(e, 'portfolio_link', setUserInfo)}
        />
      </label>
      {/* save button should save the user's progress by updating it in the database so they don't lose this on refresh */}
      <button>save</button>
    </div>
  );
};
