import React from 'react';
import './Form.scss'

export const Form = ({ buttonText, inputs, onSubmit }) => {
  return (
  <form className="form" onSubmit={onSubmit}>
    
    {
      inputs.map(input => (
        <div key={input.name} className='input-div'>
        <label htmlFor={input.name}>{input.labelText}</label>
        <input 
          id={input.name}
          name={input.name}
          onChange={input.onChange}
          type={input.type}
          value={input.value}
        />
        </div>
      ))
    }
    <button type='submit'>{buttonText}</button>
  </form>
  )
};
