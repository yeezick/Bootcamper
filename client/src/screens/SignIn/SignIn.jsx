import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { signIn, checkEmailAuth } from '../services/api/users.js';
// import { handleTextChange } from '../services/utils/handlers.js';
// import { uiActions } from '../services/redux/slices/uiSlice';
// import { uiActions } from '../../services/utils/';

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
    <View className="account-forms">
      <Text className="title">Welcome Back!</Text>
      <View className="input-container">
        <Text>Email</Text>
        <TextInput
          value={loginInfo.email}
          className="input"
          onChangeText={(email) => handleTextChange(email, 'email', setLoginInfo)}
          keyboardType="email-address"
          autoCapitalize="none"
          ref={emailInputRef}
          onFocus={() => setNoAccountError(null)}
          onBlur={() => validEmail()}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current();
            passwordInputRef.current.focus();
          }}
        />
      </View>
      <Text>{noAccountError}</Text>
      <View className="input-container">
        <Text>Password</Text>
        <TextInput
          value={loginInfo.password}
          className="input"
          onChangeText={(password) => handleTextChange(password, 'password', setLoginInfo)}
          ref={passwordInputRef}
          returnKeyType="next"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity className="single-button" onPress={handleSignIn} color="white">
        <Text className="button-text">Log In</Text>
      </TouchableOpacity>
      <Button title="Forgot Password?" />
    </View>
  );
};
