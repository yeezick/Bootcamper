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

export const CreateProfile = ({ currUser }) => {
  const header = {
    text: "Before you can create or join a project, we'll need to finish your profile first.",
    title: 'About You',
  };

  return (
    <>
      <div className="create-profile">
        <h3 className="header">Create Profile</h3>
        <AboutUser />
        <ShowPortfolioProjects currUser={currUser} />
        <a className="later-link" href="/roulette">
          Complete later
        </a>
      </div>
    </>
  );
};

const AboutUser = () => {
  const { editMode, user } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    role: '',
    about: '',
    portfolio_link: '',
  });

  useEffect(() => {
    if (editMode) {
      const { about, fun_fact, portfolio_link, role } = user;
      setUserInfo({
        role,
        about,
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
    <div className="about-user">
      <Form formData={createProfileForm} formState={[userInfo, setUserInfo, handleUserUpdate]} />
    </div>
  );
};

const Form = ({ formData, formState }) => {
  const { button, handlers, inputs } = formData;
  const [stateObject, setterFunction, handleSubmit] = formState;

  const submitFormPayload = {
    handlers: handleSubmit,
    title: button.text,
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <div key={input.name} className="input-wrapper">
          <label htmlFor={input.name}>{parseHtml(input.labelText)}</label>
          {input.type === 'select' ? (
            <select
              defaultValue={input.options[0]}
              onChange={(e) => handleChange(e, input.name, setterFunction)}
            >
              {input.options.map((option) => (
                <option key={`${input.name}-${option}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={input.name}
              name={input.name}
              onChange={(e) => handleChange(e, input.name, setterFunction)}
              type={input.type}
              value={stateObject[input.name]}
              required={input.required ? true : null}
            />
          )}
        </div>
      ))}
      <div className="action-btn-container">
        <SingleActionButton payload={submitFormPayload} />
      </div>
    </form>
  );
};

export const createProfileForm = {
  button: {
    text: 'Next',
    type: 'single',
  },
  handlers: {
    // setterFunction: ,
    // onSubmit: ,
  },
  inputs: [
    {
      labelText: '<small>I am a</small>',
      name: 'role',
      required: true,
      type: 'select',
      options: ['Select Occupation', 'UX Designer', 'Software Engineer'],
    },
    {
      labelText: '<small>About Me</small>',
      name: 'about',
      max_chars: 250,
      required: true,
      type: 'textarea',
    },
    {
      labelText: '<small>Portfolio Link</small>',
      name: 'portfolio_link',
      type: 'text',
    },
  ],
};
