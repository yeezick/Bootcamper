import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// assets
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/redux/slices/uiActions.js';
import '../SignUp/SignUp.scss';
import store from '../../services/redux/store.js'
import { GenericModal } from '../../components/Modal/GenericModal';
import { handleChange } from '../../services/utils/formHandlers';
import { SingleActionButton } from '../../components/Button/SingleActionButton';
import { checkEmailAuth, signOut } from '../../services/api/users';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [noAccountError, setNoAccountError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: 'test@test.com',
    password: 'test',
  });

  useEffect( async () => {
    signOut();
  },[])

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!noAccountError) {
      await dispatch(loginUser(loginInfo));
      //check for user
      const state = store.getState();
      if (state.ui.user.email === loginInfo.email) {
        navigate(`/users/${state.ui._id}/edit`);
      } else {
        setShowModal(true);
        setLoginInfo(prevState => {
          return {
            ...prevState,
            password: '',
          }
        })
      }
    } else {
      setShowModal(true);
      setLoginInfo((prevState) => {
        return {
          ...prevState,
          password: '',
        }
      })
    }
    
  };

  const validEmail = async () => {
    const emailReq = { email: loginInfo.email }
    const res = await checkEmailAuth(emailReq);
    if (!res) {
      setNoAccountError(true);
    }
  }


  return (
    <div className="sign-in-screen auth-form">
      {showModal && <GenericModal
        setShowModal={setShowModal}
        bodyText="Invalid credentials. Please check your info try again, or register a new account."
        buttonText="Ok"
      />}
      <h4>Welcome Back!</h4>
      <form className="form sign-in" onSubmit={handleSignIn}>
        <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                name="email"
                onChange={(e) => handleChange(e, "email", setLoginInfo)}
                type="text"
                value={loginInfo["email"]}
                onFocus={()=> setNoAccountError(false)}
                onBlur={() => validEmail()}
                />
            </div>
            <div className="form-error">
              { noAccountError && <h6>User not found.</h6> }
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                name="password"
                onChange={(e) => handleChange(e, "password", setLoginInfo)}
                type="password"
                value={loginInfo["password"]}
                />
          </div>
          <SingleActionButton text="Log In" type="submit" />
      </form>
      {/* Placeholder for future functionality  */}
      <a href="#">Forgot Password?</a>
    </div>
  );
};
