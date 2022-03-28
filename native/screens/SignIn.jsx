import { useState, createRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut, checkEmailAuth, verify } from '../services/api/users.js';
import { loginUser } from '../services/redux/actions/uiActions.js';

// Native Components
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Button,
  Alert,
} from "react-native";


export const SignIn = ({navigation}) => {
  // redux
  const dispatch = useDispatch();
  // error states
  const [noAccountError, setNoAccountError] = useState(null);
  const [authError, setAuthError] = useState(null);
  // log in state
  const [logInInfo, setLogInInfo] = useState({
    email: '',
    password: '',
  });
  // input references
  const { emailInputRef, passwordInputRef } = createRef();

  // sign out user on sign in screen render
  useEffect(() => {
    signOut();
  }, []);

  const handleSignIn = async () => {
    await dispatch(loginUser(logInInfo));
    const user = await verify();
    if (user.email === logInInfo.email) {
      setLogInInfo({
        email: '',
        password: '',
      });
      // check this params functionality on edit land
      navigation.navigate('EditProfile', {
        id: user._id,
      })
    } else {
      setAuthError(
        "Invalid credentials. Please check your details and try again."
      );
      Alert.alert(authError);
      setLogInInfo((prevState) => {
        return {
          ...prevState,
          password: "",
        };
      });
    }
  };

  const validEmail = async () => {
    const emailReq = { email: logInInfo.email };
    const res = await checkEmailAuth(emailReq);
    if (!res) {
      setNoAccountError("Account not found.");
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
          onChangeText={(email) => setLogInInfo((prevState) => {
            return {
              ...prevState,
              email: email,
            }
          })}
          keyboardType="email-address"
          autoCapitalize="none"
          ref={emailInputRef}
          onFocus={()=> setNoAccountError(null)}
          onBlur={() => validEmail()}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current &&
            passwordInputRef.current.focus()
          }}
        />
      </View>
      <Text>{noAccountError}</Text>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput 
          value={logInInfo.password}
          style={styles.input}
          onChangeText={(password) => setLogInInfo((prevState) => {
            return {
              ...prevState,
              password: password
            }
          })}
          ref={passwordInputRef}
          returnKeyType="next"
          secureTextEntry={true}
          onSubmitEditing={() => {
            confirmPasswordInputRef.current &&
            confirmPasswordInputRef.current.focus()
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.singleButton}
        onPress={() => handleSignIn()}
        color="white">
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
    borderStyle: "solid",
    borderWidth: 1,
    color: "black",
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
  }
})
