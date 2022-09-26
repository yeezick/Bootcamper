import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../services/redux/slices/uiSlice';
import { updateUser } from '../../services/api/users';
import './CreateProfile.scss';


export const CreateProfile = () => {
  const { user } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    role: '',
    about: '',
    portfolio_link: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(user._id, userInfo);
      console.log(user._id);
      dispatch(uiActions.updateUser(res));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const header = {
    text: "Before you can create or join a project, we'll need to finish your profile first.",
    title: 'About You',
  };

  return (
    <div className="create-profile">
      <h3 className="header">Create Profile</h3>
      <form className="form create-profile-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="role">I am a</label>
          <select className="Occupation-roles" name="role" id="role" onChange={handleChange}>
            <option defaultValue="Select occupation">Select Occupation</option>
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
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="portfolio-link">Portfolio Link</label>
          <input
            required
            id="portfolio_link"
            name="portfolio_link"
            type="text"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        <div className="action-btn-container">
          <button type="submit" onClick={() => console.log(userInfo)}>
            Next
          </button>
        </div>
      </form>

      <a className="later-link" href="/roulette">
        Complete later
      </a>
    </div>
  );
};
