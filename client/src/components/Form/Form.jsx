import React from 'react';

export const Form = ({onSubmit, inputs, buttonText}) => {
  return (
  <form onSubmit={onSubmit}>
    
    {
      inputs.map(input => (
        <div key={input.name} className="input">
        <label htmlFor={input.name}>{input.labelText}</label>
        <input 
          type={input.type}
          name={input.name}
          value={input.value}
          onChange={input.onChange}
        />
        </div>
      ))
    }
    <button type="submit">{buttonText}</button>
  </form>
  )
};
