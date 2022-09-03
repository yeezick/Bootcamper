import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// assets
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/redux/actions/uiActions.js';
import './SignIn.scss';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../../components/Button/SingleActionButton';
import { checkEmailAuth, signOut, verify } from '../../services/api/users';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id: userId } = useSelector((state) => state.ui.user);
  const [authError, setAuthError] = useState(null);
  const [noAccountError, setNoAccountError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const routeToEditProfile = {
    handler: null,
    title: 'Sign In',
  };

  useEffect(() => {
    signOut();
  }, []);

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

  const validEmail = async () => {
    const emailReq = { email: loginInfo.email };
    const res = await checkEmailAuth(emailReq);
    if (!res) {
      setNoAccountError('Account not found.');
    }
  };

  return (
    <div className="sign-in-screen">
      <p>Log In</p>
      <form className="form sign-in" onSubmit={handleSignIn}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            required
            id="email"
            name="email"
            onChange={(e) => handleChange(e, 'email', setLoginInfo)}
            type="email"
            value={loginInfo['email']}
            onFocus={() => setNoAccountError(false)}
            onBlur={() => validEmail()}
            autoComplete="on"
          />
        </div>
        <div className="form-error">
          <h6>{noAccountError}</h6>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            required
            id="password"
            name="password"
            onChange={(e) => handleChange(e, 'password', setLoginInfo)}
            type="password"
            value={loginInfo['password']}
            onFocus={() => setAuthError(null)}
            autoComplete="current-password"
          />
        </div>
        <div className="form-error">
          <h6>{authError}</h6>
        </div>
        <div className="action-btn-container">
          {/* Remove text setting once singleActionButton is merged */}
          <SingleActionButton payload={routeToEditProfile} type="submit" style="default" />
        </div>
      </form>
      {/* Placeholder for future functionality  */}
    </div>
  );
};
