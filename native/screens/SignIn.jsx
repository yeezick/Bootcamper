import { useState, createRef } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, checkEmailAuth } from '../services/api/users.js';
import { handleTextChange } from '../services/utils/handlers.js';
import { uiActions } from '../services/redux/slices/uiSlice';

// Native Components
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { Header } from '../components/Header/Header.jsx';

export const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const [noAccountError, setNoAccountError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const { emailInputRef, passwordInputRef } = createRef();

  const handleSignIn = async () => {
    const signedInUser = await signIn(loginInfo);
    if (signedInUser) {
      dispatch(uiActions.updateUser(signedInUser));
      // check this params functionality on edit land
      navigation.navigate('EditProfile', {
        userID: signedInUser._id,
      });
    } else {
      Alert.alert('Invalid credentials. Please check your details and try again.');
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
    <View style={styles.accountForms}>
      <Header title="Log In" />
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          value={loginInfo.email}
          style={styles.input}
          onChangeText={(email) => handleTextChange(email, 'email', setLoginInfo)}
          keyboardType="email-address"
          autoCapitalize="none"
          ref={emailInputRef}
          onFocus={() => setNoAccountError(null)}
          onBlur={() => validEmail()}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current;
            passwordInputRef.current.focus();
          }}
        />
      </View>
      <Text>{noAccountError}</Text>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          value={loginInfo.password}
          style={styles.input}
          onChangeText={(password) => handleTextChange(password, 'password', setLoginInfo)}
          ref={passwordInputRef}
          returnKeyType="next"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.singleButton} onPress={handleSignIn} color="white">
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Button title="Forgot Password?" />
    </View>
  );
};


const styles = StyleSheet.create({
  accountForms: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  input: {
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    color: 'black',
    height: 30,
    marginVertical: 10,
    padding: 5,
  },
  inputContainer: {
    marginHorizontal: 25,
    width: 290,
  },
  singleButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    margin: 20,
    width: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    margin: 20,
  },
});
