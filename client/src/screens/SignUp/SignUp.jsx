import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header.jsx';
import { Form } from '../../components/Form/Form.jsx';
// assets
import { signUpForm } from '../../services/formData.js';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../services/redux/actions/uiActions.js';

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(signUpUser(newUser));
    navigate('/');
  };

  return (
    <div className="sign-up-screen">
      <Header headerText={header.text} headerTitle={header.title} />
      <Form formData={signUpForm} formState={[newUser, setNewUser, handleSignUp]} />
    </div>
  );
};
