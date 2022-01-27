import React from 'react';
import { handleChange } from '../../services/utils/formHandlers';
import './Form.scss';

export const Form = ({ formData, formState }) => {
  const { button, handlers, inputs } = formData;
  const [stateObject, setterFunction] = formState;

  return (
    <form className="form">
      {inputs.map((input) => (
        <div key={input.name} className="input-wrapper">
          <label htmlFor={input.name}>{input.labelText}</label>
          {input.type === 'select' ? (
            <select defaultValue="" onChange={(e) => handleChange(e, input.name, setterFunction)}>
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
            />
          )}
        </div>
      ))}
      <button type="submit">{inputs.text}</button>
    </form>
  );
};
