import React from 'react';
import './Form.scss'
export const Form = ({onSubmit, inputs, buttonText}) => {
  return (
  <form className="form" onSubmit={onSubmit}>
    
    {
      inputs.map(input => (
        <div key={input.name} className='input-div'>
        <label htmlFor={input.name}>{input.labelText}</label>
        <input 
          type={input.type}
          id={input.name}
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
