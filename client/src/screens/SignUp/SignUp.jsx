import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/api/users.js";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    try {
      const newUser = await signUp(formData);
      console.log(newUser);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }
  const { first_name, last_name, email, password, passwordConfirm } = formData;

  return (
    <div className='sign-up-screen'>
      <div className="header">
        <p>header text for signUp screen</p>
      </div>
      <form onSubmit={onSignUp}>
        <label htmlFor="first_name">What's your first name?</label>
        <input 
          type="text"
          name="first_name"
          value={first_name}
          onChange={handleChange}
        />
        <label htmlFor="last_name">What's your last name?</label>
        <input 
          type="text"
          name="last_name"
          value={last_name}
          onChange={handleChange} 
        />
        <label htmlFor="email">What's your email?</label>
        <input 
          type="email" 
          name="email"
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="password">Create a password:</label>
        <input 
          type="password" 
          name="password"
          value={password}
          onChange={handleChange}
        />
        <label htmlFor="passwordConfirm">Confirm your password:</label>
        <input 
          type="password" 
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={handleChange} 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
