import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn, checkEmailAuth } from '../../services/api/users.js';
import { handleTextChange } from '../../services/utils/formHandlers';
import { uiActions } from '../../services/redux/slices/uiSlice';

export const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const [noAccountError, setNoAccountError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const { emailInputRef, passwordInputRef } = useRef();

  const handleSignIn = async () => {
    const signedInUser = await signIn(loginInfo);
    if (signedInUser) {
      dispatch(uiActions.updateUser(signedInUser));
      // check this params functionality on edit land
      navigation.navigate('EditProfile', {
        userID: signedInUser._id,
      });
    } else {
      alert('Invalid credentials. Please check your details and try again.');
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
      setNoAccountError('No user found with this email address.');
    }
  };

  return (
    <div className="account-forms">
      <h1 className="title">Log In</h1>
      <div className="input-container">
        <label>Email</label>
        <input
          value={loginInfo.email}
          className="input"
          onChangeText={(email) => handleTextChange(email, 'email', setLoginInfo)}
          type="email"
          ref={emailInputRef}
          onSubmitEditing={() => {
            passwordInputRef.current();
            passwordInputRef.current.focus();
          }}
        />
      </div>
      <span>{noAccountError}</span>
      <div className="input-container">
        <label>Password</label>
        <input
          type="password"
          value={loginInfo.password}
          className="input"
          onChangeText={(password) => handleTextChange(password, 'password', setLoginInfo)}
          ref={passwordInputRef}
          secureTextEntry={true}
        />
      </div>
      <button className="single-button" onPress={handleSignIn}>
        Sign In
      </button>
    </div>
  );
};
