import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// assets
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../services/redux/actions/uiActions.js';
// import { GenericModal } from '../../components/Modal/GenericModal.jsx';
import './SignUp.scss';
import { checkEmailAuth, verify } from '../../services/api/users.js';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../../components/Button/SingleActionButton.jsx';
import { DoubleActionModal } from '../../components/Modal/DoubleActionModal.jsx';
//import { Header } from '../../components/Header/Header';

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalError, setModalError] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [newUser, setNewUser] = useState({
    confirm_password: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  const routeToCreateProfile = {
    handler: null,
    title: 'Register',
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (newUser.confirm_password !== newUser.password) {
      setNewUser((prevState) => {
        return {
          ...prevState,
          confirm_password: '',
          password: '',
        };
      });
      setModalError('Passwords do not match. Please try again.');
      setShowModal(true);
    } else if (emailError) {
      setModalError(
        'An account with this email already exists. Please try another email or Sign in.'
      );
      setShowModal(true);
      setNewUser((prevState) => {
        return {
          ...prevState,
          email: '',
          confirm_password: '',
          password: '',
        };
      });
      setEmailError(null);
    } else {
      dispatch(signUpUser(newUser));
      setShowSuccessModal(true);
    }
  };

  const handleEmailCheck = async (e) => {
    const emailReq = { email: e.target.value };
    const res = await checkEmailAuth(emailReq);
    if (res) {
      setEmailError(res);
    }
  };

  const handleEditProfile = async () => {
    const { _id } = await verify();
    navigate(`/users/${_id}/edit`);
  };

  return (
    <div className="sign-up-screen">
      {showSuccessModal && (
        <DoubleActionModal
          setShowModal={setShowSuccessModal}
          bodyText="Success! Do you want to finish setting up your profile or try out the Roulette?"
          leftText="Finish Profile"
          leftOnClick={() => handleEditProfile()}
          rightText="Go to Roulette"
          rightOnClick={() => navigate('/roulette')}
        />
      )}
      {/* {showModal && (
        <GenericModal bodyText={modalError} buttonText="Ok" setShowModal={setShowModal} />
      )} */}
      <div className='header'>
        <h3>Sign Up</h3>
      </div>
      <form className="form sign-up" onSubmit={handleSignUp}>
        <div className="input-wrapper">
          <label htmlFor="first_name">First Name</label>
          <input
            required
            id="first_name"
            name="first_name"
            onChange={(e) => handleChange(e, 'first_name', setNewUser)}
            type="text"
            value={newUser['first_name']}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="last_name">Last Name</label>
          <input
            required
            id="last_name"
            name="last_name"
            onChange={(e) => handleChange(e, 'last_name', setNewUser)}
            type="text"
            value={newUser['last_name']}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            required
            id="email"
            name="email"
            onChange={(e) => handleChange(e, 'email', setNewUser)}
            type="email"
            value={newUser['email']}
            onFocus={() => setEmailError(null)}
            onBlur={(e) => handleEmailCheck(e)}
          />
        </div>
        <div className="form-error">
          <h6>{emailError}</h6>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            required
            id="password"
            name="password"
            onChange={(e) => handleChange(e, 'password', setNewUser)}
            type="password"
            value={newUser['password']}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirm_password">Re-enter Password</label>
          <input
            required
            id="confirm_password"
            name="confirm_password"
            onChange={(e) => handleChange(e, 'confirm_password', setNewUser)}
            type="password"
            value={newUser['confirm_password']}
          />
        </div>
        <div className="form-error">
          {newUser.password !== '' && (
            <h6>
              {newUser.password === newUser.confirm_password
                ? 'Passwords match.'
                : 'Passwords do not match.'}
            </h6>
          )}
        </div>
        <SingleActionButton payload={routeToCreateProfile} text="Register" type="submit" />
      </form>
      <h6>
        Already have an account? <Link to="/sign-in">Sign in.</Link>
      </h6>
    </div>
  );
};
