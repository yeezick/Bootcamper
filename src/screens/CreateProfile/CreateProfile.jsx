import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShowPortfolioProjects } from '../../components/Projects/PortfolioCard/PortfolioCard';
import parseHtml from 'html-react-parser';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../../components/Button/SingleActionButton';

import { uiActions } from '../../services/redux/slices/uiSlice';
import { updateUser } from '../../services/api/users';
import './CreateProfile.scss';
import { useEffect } from 'react';

// assets

import { loginUser } from '../../services/redux/actions/uiActions.js';
import { checkEmailAuth, signOut, verify } from '../../services/api/users';

export const CreateProfile = ({ currUser }) => {
  // const [aboutMe, setAboutMe] = useState(null);
  // const [link, setLink] = useState(null);


  const header = {
    text: "Before you can create or join a project, we'll need to finish your profile first.",
    title: 'About You',
  };

  return (
    <div className="create-profile">
      <h3 className="header">Create Profile</h3>
      <form className="create-profile-form">
        <div className="input-wrapper">
          <label htmlFor="occupation">I am a</label>
          <select className="Occupation-roles">
            <option selected value="Select occupation">
              Select Occupation
            </option>
            <option value="software-developer">Software Developer</option>
            <option value="ux-designer">UX Designer</option>
          </select>
        </div>
        <div className="input-wrapper">
          <label htmlFor="about-me">About Me</label>
          <input
            required
            id="about"
            name="about"
            type="textarea"
            onChange={(e) => handleChange(e, 'about-me', setAboutMe)}
            autoComplete="on"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="portfolio-link">Portfolio Link</label>
          <input
            required
            id="link"
            name="link"
            type="text"
            onChange={(e) => handleChange(e, 'link', setLink)}
            autoComplete="on"
          />
        </div>
        {/* <div className="action-btn-container">
        <SingleActionButton payload={submitFormPayload} />
      </div> */}
      </form>
      
      <a className="later-link" href="/roulette">
        Complete later
      </a>
    </div>
  );
};
