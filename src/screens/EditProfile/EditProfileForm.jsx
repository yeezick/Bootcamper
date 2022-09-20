import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import parseHtml from 'html-react-parser';
import { handleChange } from '../../services/utils/formHandlers';
import './EditProfileForm.scss';

export const EditProfileForm = ({ formData, formState }) => {
  const { button, handlers, inputs } = formData;
  const [stateObject, setterFunction, handleSubmit] = formState;
  const [aboutCharCount, setAboutCharCount] = useState(0);
  const [factCharCount, setFactCharCount] = useState(0);
  const navigate = useNavigate();

  const showUser = (applicantID) => {
    navigation.navigate('UserProfile', {
      userID: applicantID,
    });
  };

  const handleContent = (e) => {
    if (e.target.name === 'about') {
      setAboutCharCount(e.target.value.length);
    } else if (e.target.name === 'fun_fact') {
      setFactCharCount(e.target.value.length);
    }
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <button className="submit-btn" type="submit" onClick={showUser}>
        Done
      </button>
      {inputs.map((input) => (
        <div className="container">
          <label htmlFor={input.name} id={input.name}>
            {parseHtml(input.labelText)}
          </label>
          {input.type === 'checkbox' ? (
            <div key={input.name} className="role-wrapper">
              {input.options.map((option) => (
                <div className="role-inputs">
                  <input
                    className="checkbox"
                    key={input.name}
                    onChange={(e) => handleChange(e, input.name, setterFunction)}
                    type={input.type}
                    value={option}
                  />
                  <label htmlFor={input.name}>{option}</label>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <textarea
                id={input.name}
                name={input.name}
                key={input.name}
                onChange={(e) => {
                  handleChange(e, input.name, setterFunction);
                  handleContent(e);
                }}
                type={input.type}
                value={stateObject[input.name]}
                maxLength={input.max_chars}
                required={input.required ? true : null}
              ></textarea>
              {input.name === 'about' ? (
                <p className="charCount">{250 - aboutCharCount}</p>
              ) : (
                <p className="charCount">{250 - factCharCount}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </form>
  );
};
