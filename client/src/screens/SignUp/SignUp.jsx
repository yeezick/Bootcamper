import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form/Form.jsx';
// assets
import { signUpForm } from '../../services/formData.js';
import { useDispatch, getState } from 'react-redux';
import { signUpUser } from '../../services/redux/slices/uiActions.js';
import { GenericModal } from '../../components/Modal/GenericModal.jsx';
import './SignUp.scss';


export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    confirm_password: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  const header = {
    text: "In order to find projects and connect with other users, we'll need to create an account.",
    title: 'Create an account',
  };


  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, first_name, last_name, password } = newUser
    if (email === "" || first_name === "" || last_name === "" || password === "") {
      setError("Please fill in all required fields.")
      setShowModal(true)
    } else if (newUser.confirm_password !== newUser.password) {
      setNewUser(prevState => {
        return {
          ...prevState,
          confirm_password: '',
          password: '',
        }
      });
      setError("Passwords do not match")
      setShowModal(true)
    } else {
      dispatch(signUpUser(newUser));
    }

      // navigate('/');
    
  };

  return (
    <div className="sign-up-screen">
      {showModal && 
        <GenericModal 
          bodyText={error} 
          buttonText="Ok" 
          setShowModal={setShowModal}/>  }
          <h4>Create an account</h4>
      <Form formData={signUpForm} formState={[newUser, setNewUser, handleSignUp]} />
    </div>
  );
};
