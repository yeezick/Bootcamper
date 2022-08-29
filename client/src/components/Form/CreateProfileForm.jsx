import React from 'react';
import parseHtml from 'html-react-parser';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../Button/SingleActionButton';
import './CreateProfileForm.scss';

export const CreateProfileForm = ({ formData, formState }) => {
  const { button, handlers, inputs } = formData;
  const [stateObject, setterFunction, handleSubmit] = formState;

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
      <SingleActionButton className='next-button-create-prof' text={button.text} type="submit" />
    </form>
  );
};