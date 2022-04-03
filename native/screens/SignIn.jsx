import { useState, createRef } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, checkEmailAuth } from '../services/api/users.js';
import { handleTextChange } from '../services/utils/handlers.js';
import { uiActions } from '../services/redux/slices/uiSlice';

// Native Components
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';

export const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const [noAccountError, setNoAccountError] = useState(null);
  const [logInInfo, setLogInInfo] = useState({
    email: '',
    password: '',
  });
  const { emailInputRef, passwordInputRef } = createRef();

  const handleSignIn = async () => {
    const signedInUser = await signIn(logInInfo);
    if (signedInUser) {
      dispatch(uiActions.updateUser(signedInUser));
      // check this params functionality on edit land
      navigation.navigate('EditProfile', {
        userID: signedInUser._id,
      });
    } else {
      Alert.alert('Invalid credentials. Please check your details and try again.');
      setLogInInfo((prevState) => {
        return {
          ...prevState,
          password: '',
        };
      });
    }
  };

  const validEmail = async () => {
    const emailReq = { email: logInInfo.email };
    const res = await checkEmailAuth(emailReq);
    if (!res) {
      setNoAccountError('No user found with this email address.');
    }
  };

  return (
    <View style={styles.accountForms}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          value={logInInfo.email}
          style={styles.input}
          onChangeText={(email) => handleTextChange(email, 'email', setLogInInfo)}
          keyboardType="email-address"
          autoCapitalize="none"
          ref={emailInputRef}
          onFocus={() => setNoAccountError(null)}
          onBlur={() => validEmail()}
          returnKeyType="next"
          onSubmitEditing={() => {
            console.log(passwordInputRef.current);
            console.log(passwordInputRef.current.focus());
          }}
        />
      </View>
      <Text>{noAccountError}</Text>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          value={logInInfo.password}
          style={styles.input}
          onChangeText={(password) => handleTextChange(password, 'password', setLogInInfo)}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    margin: 20,
    fontSize: 16,
  },
  inputContainer: {
    width: 290,
    marginHorizontal: 25,
  },
  input: {
    height: 30,
    marginVertical: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    color: 'black',
    padding: 5,
  },
  singleButton: {
    backgroundColor: 'black',
    height: 40,
    width: 120,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});
