import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header.jsx'
import { Form } from '../../components/Form/Form'
import { signIn } from '../../services/api/users.js'

export const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData;

  const handleSignIn = async (event) => {
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
  const headerText = "Welcome back! Let's get you signed in!"
  const headerTitle = 'Sign In'
  
  const inputs =[
    {labelText: 'Email:', name: 'email', onChange: handleChange, type: 'email',  value: email,},
    {labelText: 'Password:',name: 'password', onChange: handleChange, type: 'password', value: password,  }
  ]

  const buttonText = 'Sign in'
  
  return (
    <div className='sign-in-screen'>
      <Header headerText={headerText} headerTitle={headerTitle} />
      <Form buttonText={buttonText} inputs={inputs} onSubmit={handleSignIn} />
    </div>
  )
}
