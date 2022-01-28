import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header.jsx';
import { Form } from '../../components/Form/Form.jsx';
import { signUp } from '../../services/api/users.js';
import { signUpForm } from '../../services/formData.js';

export const SignUp = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    confirmPassword: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  const header = {
    text: "In order to find projects and connect with other users, we'll need to create an account.",
    title: 'Register',
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const createdUser = await signUp(newUser);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sign-up-screen">
      <Header headerText={header.text} headerTitle={header.title} />
      <Form formData={signUpForm} formState={[newUser, setNewUser, handleSignUp]} />
    </div>
  );
};
