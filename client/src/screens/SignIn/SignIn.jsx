import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header.jsx'
import { Form } from '../../components/Form/Form'
import { signIn } from '../../services/api/users.js'

export const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { email, password } = formData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await signIn(formData);
      console.log(user);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
  const headerTitle = "Sign In"
  const headerText = "Welcome back! Let's get you signed in!"
  
  const inputs =[
    {type: "email", name: "email", value: email, onChange: handleChange, labelText: "Email:"},
    {type: "password", name: "password", value: password, onChange: handleChange, labelText: "Password:"}
  ]

  const buttonText = "Sign in"
  
  return (
    <div className='sign-in-screen'>
      <Header headerTitle={headerTitle} headerText={headerText}/>
      <Form onSubmit={handleSubmit} inputs={inputs} buttonText={buttonText}/>
    </div>
  )
}
