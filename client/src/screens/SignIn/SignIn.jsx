import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header.jsx';
import { Form } from '../../components/Form/Form';
import { signIn } from '../../services/api/users.js';
import { signInForm } from '../../services/formData.js';

export const SignIn = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const user = await signIn(loginInfo);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const header = {
    text: "Welcome back! Let's get you signed in!",
    title: 'Sign In',
  };

  return (
    <div className="sign-in-screen">
      <Header headerText={header.text} headerTitle={header.title} />
      <Form formData={signInForm} formState={[loginInfo, setLoginInfo, handleSignIn]} />
    </div>
  );
};
