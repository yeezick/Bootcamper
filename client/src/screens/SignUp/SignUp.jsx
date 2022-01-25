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
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });
  const { first_name, last_name, email, password, confirmPassword } = formData;

  // pass header information for Header component
  const headerTitle = 'Register'
  const headerText = "In order to find projects and connect with other users, we'll need to create an account."
  
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
    {type: "text", name: "first_name", value: first_name, onChange: handleChange, labelText: "What's your first name?" }, 
    {type: "text", name: "last_name", value: last_name, onChange: handleChange, labelText: "What's your last name?" }, 
    {type: "email", name: "email", value: email, onChange: handleChange, labelText: "What's your email?" }, 
    {type: "password", name: "password", value: password, onChange: handleChange, labelText: "Create a password:" },
    {type: "password", name: "confirmPassword", value: confirmPassword, onChange: handleChange, labelText: "Confirm password:" },
  ]
  const buttonText = "Register"
  

  return (
    <div className='sign-up-screen'>
      <Header headerTitle={headerTitle} headerText={headerText}/>
      <Form onSubmit={handleSubmit} inputs={inputs} buttonText={buttonText} />
    </div>
  )
}

