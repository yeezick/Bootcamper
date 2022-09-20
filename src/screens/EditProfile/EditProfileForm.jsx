import React, { useState } from 'react';
import parseHtml from 'html-react-parser';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../../components/Button/SingleActionButton';
import './EditProfileForm.scss';

export const EditProfileForm = ({ formData, formState }) => {
  const { button, handlers, inputs } = formData;
  const [stateObject, setterFunction, handleSubmit] = formState;
  const [charCount, setCharCount] = useState(0);

  const submitFormPayload = {
    handlers: handleSubmit,
    title: button.text,
  };

  const handleContent = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
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
                onChange={(e) => {
                  handleChange(e, input.name, setterFunction);
                  handleContent(e);
                }}
                rows="14"
                cols="35"
                wrap="soft"
                type={input.type}
                value={stateObject[input.name]}
                maxLength={input.max_chars}
                required={input.required ? true : null}
              ></textarea>
              <p className="charCount">{250 - charCount}</p>
            </div>
          )}
        </div>
      ))}
      {/* <SingleActionButton payload={submitFormPayload} /> */}
    </form>
  );
};
