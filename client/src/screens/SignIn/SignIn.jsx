import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header.jsx';
import { Form } from '../../components/Form/Form';
// assets
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/redux/actions/uiActions.js';
import { signInForm } from '../../services/formData.js';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: 'test@test.com',
    password: 'test',
  });

  const handleSignIn = async (event) => {
    event.preventDefault();
    dispatch(loginUser(loginInfo));
    navigate('/');
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
