import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// assets
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/redux/slices/uiActions.js';
import '../SignUp/SignUp.scss';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../../components/Button/SingleActionButton';
import { checkEmailAuth, signOut, verify } from '../../services/api/users';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.ui.user);
  const [authError, setAuthError] = useState(null);
  const [noAccountError, setNoAccountError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: 'test@test.com',
    password: 'test',
  });

  useEffect(() => {
    signOut();
  },[])

  const handleSignIn = async (event) => {
    event.preventDefault();
    await dispatch(loginUser(loginInfo));
    const user = await verify();
    if (user.email === loginInfo.email) {
        navigate(`/users/${_id}/edit`);
    } else {
      setAuthError("Invalid credentials. Please check your details and try again.")
      setLoginInfo((prevState) => {
        return {
          ...prevState,
          password: '',
        }
      });
    }
    
  };

  const validEmail = async () => {
    const emailReq = { email: loginInfo.email }
    const res = await checkEmailAuth(emailReq);
    if (!res) {
      setNoAccountError("Account not found.");
    }
  }


  return (
    <div className="sign-in-screen auth-form">
      <h4>Welcome Back!</h4>
      <form className="form sign-in" onSubmit={handleSignIn}>
        <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input 
                required
                id="email"
                name="email"
                onChange={(e) => handleChange(e, "email", setLoginInfo)}
                type="email"
                value={loginInfo["email"]}
                onFocus={()=> setNoAccountError(false)}
                onBlur={() => validEmail()}
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
                onChange={(e) => handleChange(e, "password", setLoginInfo)}
                type="password"
                value={loginInfo["password"]}
                onFocus={() => setAuthError(null)}
                />
          </div>
          <div className="form-error">
            <h6>{authError}</h6>
          </div>
          <SingleActionButton text="Log In" type="submit" />
      </form>
      {/* Placeholder for future functionality  */}
      <a href="#">Forgot Password?</a>
    </div>
  );
};
