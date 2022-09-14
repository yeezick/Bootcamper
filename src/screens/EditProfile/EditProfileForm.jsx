import React from 'react';
import parseHtml from 'html-react-parser';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../../components/Button/SingleActionButton';
import './EditProfileForm.scss';

export const EditProfileForm = ({ formData, formState }) => {
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
          {input.type === 'checkbox' ? (
            <div>
              {input.options.map((option) => (
                <>
                  <input
                    key={input.name}
                    value={option}
                    onChange={(e) => handleChange(e, input.name, setterFunction)}
                    type={input.type}
                  />
                  <label htmlFor={input.name}>{option}</label>
                </>
              ))}
            </div>
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
      <SingleActionButton payload={submitFormPayload} />
    </form>
  );
};
