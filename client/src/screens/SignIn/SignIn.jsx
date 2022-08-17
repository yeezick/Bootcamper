import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleTextChange } from '../../services/utils/formHandlers';
import { loginUser } from '../../services/redux/actions/uiActions.js';
import { uiActions } from '../../services/redux/slices/uiSlice';
import { SingleActionButton } from '../../components/Button/SingleActionButton';
import { checkEmailAuth, verify } from '../../services/api/users.js';
import './SignIn.scss';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id: userId } = useSelector((state) => state.ui.user);
  const [noAccountError, setNoAccountError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const { emailInputRef, passwordInputRef } = useRef();

  const handleSignIn = async (event) => {
    event.preventDefault();
    await dispatch(loginUser(loginInfo));
    const user = await verify();
    if (user.email === loginInfo.email) {
      navigate(`/users/${userId}/edit`);
    } else {
      setAuthError('Invalid credentials. Please check your details and try again.');
      setLoginInfo((prevState) => {
        return {
          ...prevState,
          password: '',
        };
      });
    }
  };

  const handleTextChange = (event) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  const validEmail = async () => {
    const emailReq = { email: loginInfo.email };
    const res = await checkEmailAuth(emailReq);
    if (!res) {
      setNoAccountError('No user found with this email address.');
    }
  };

  return (
    <div className="account-forms">
      <h1 className="title">Log In</h1>
      <form className="form sign-in" onSubmit={handleSignIn}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            // defaultValue={loginInfo.email}
            className="input"
            name="email"
            onChange={handleTextChange}
            onFocus={() => setNoAccountError(false)}
            onBlur={() => validEmail()}
            type="email"
            // ref={emailInputRef}
            autoComplete="on"
          />
        </div>
        <span>{noAccountError}</span>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            // defaultValue={loginInfo.password}
            className="input"
            name="password"
            onChange={handleTextChange}
            // ref={passwordInputRef}
            onFocus={() => setAuthError(null)}
          />
        </div>
        <div className="form-error">
          <h6>{authError}</h6>
        </div>
        <SingleActionButton text="Sign In" type="submit" />
      </form>
    </div>
  );
};
