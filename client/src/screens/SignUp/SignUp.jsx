import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from '../../components/Header/Header.jsx'
import { Form } from '../../components/Form/Form.jsx';
import { signUp } from "../../services/api/users.js";

export const SignUp = () => {
  const navigate = useNavigate();

  // define state variables
  const [formData, setFormData] = useState({
    confirmPassword: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const { confirmPassword, email, first_name, last_name, password } = formData;

  // pass header information for Header component
  const headerText = "In order to find projects and connect with other users, we'll need to create an account."
  const headerTitle = 'Register'
  
 // define functions for screen
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = await signUp(formData);
      console.log(newUser);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }
  
  // define inputs array for Form component; pass both input and label information here; also pass text for submit button in Form component
  const inputs = [
    {labelText: "What's your first name?", name: 'first_name', onChange: handleChange, type: 'text', value: first_name}, 
    {labelText: "What's your last name?", name: 'last_name', onChange: handleChange, type: 'text', value: last_name}, 
    {labelText: "What's your email?", name: 'email', onChange: handleChange, type: 'email',  value: email}, 
    {labelText: 'Create a password:', name: 'password', onChange: handleChange, type: 'password',  value: password},
    {labelText: 'Confirm password:', name: 'confirmPassword', onChange: handleChange, type: 'password',  value: confirmPassword},
  ]
  const buttonText = 'Register'
  

  return (
    <div className='sign-up-screen'>
      <Header headerTitle={headerTitle} headerText={headerText}/>
      <Form onSubmit={handleSubmit} inputs={inputs} buttonText={buttonText} />
    </div>
  )
}

