import { useState, createRef } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../services/api/users.js';
import { uiActions } from '../services/redux/slices/uiSlice';
import { checkEmailAuth, verify } from '../services/api/users.js';
import { handleTextChange } from '../services/utils/handlers';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Modal } from 'react-native';

export const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const {
    firstNameInputRef,
    lastNameInputRef,
    emailInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
  } = createRef();

  const handleSignUp = async () => {
    if (newUser.confirm_password !== newUser.password) {
      setNewUser((prevState) => {
        return {
          ...prevState,
          confirm_password: '',
          password: '',
        };
      });
      Alert.alert('Passwords do not match. Please try again.');
    } else if (emailError) {
      if (emailError.validEmail) {
        Alert.alert(
          `"${newUser.email}" is already registered. Please use a different email or sign in to your account.`
        );
      } else {
        Alert.alert(emailError.message);
      }
      setNewUser((prevState) => {
        return {
          ...prevState,
          confirm_password: '',
          email: '',
          password: '',
        };
      });
      setEmailError(null);
    } else {
      const registeredUser = await signUp(newUser);
      if (registeredUser) {
        dispatch(uiActions.updateUser(registeredUser));
        setSuccessModalVisible(true);
      } else {
        Alert.alert(
          'Error:\n Unsuccessful sign-up. Verify that you do not have empty fields and a valid email.'
        );
      }
    }
  };

  const handleEmailCheck = async () => {
    const emailReq = { email: newUser.email };
    if (!emailReq.email.match(/.+\@.+\..+/)) {
      setEmailError({ message: 'Not a valid email.', validEmail: false });
      return;
    }
    const res = await checkEmailAuth(emailReq);
    if (res) {
      setEmailError({ message: res, validEmail: true });
    }
  };

  const handleReroute = async (screen) => {
    let userID = null;
    if (screen === 'EditProfile') {
      let resp = await verify();
      userID = resp._id;
    }
    setSuccessModalVisible(false);
    // need to test this params funcionality on edit profile screen
    navigation.navigate(screen, {
      userID,
    });
  };

  return (
    <View style={styles.accountForms}>
      <Modal visible={successModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.centeredView}>Success!</Text>
          {/* Replace these with SingleButton or DoubleButton component*/}
          <TouchableOpacity
            style={styles.singleButton}
            onPress={() => handleReroute('EditProfile')}
            color="white"
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleButton}
            onPress={() => handleReroute('Roulette')}
            color="white"
          >
            <Text style={styles.buttonText}>Go to Roulette</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={styles.title}>Create an Account</Text>
      {/* Replace with Form componenet? */}
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput
          value={newUser.first_name}
          style={styles.input}
          onChangeText={(firstName) => handleTextChange(firstName, 'first_name', setNewUser)}
          keyboardType="default"
          ref={firstNameInputRef}
          returnKeyType="next"
          onSubmitEditing={() => {
            lastNameInputRef.current && lastNameInputRef.current.focus();
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Last Name</Text>
        <TextInput
          value={newUser.last_name}
          style={styles.input}
          onChangeText={(lastName) => handleTextChange(lastName, 'last_name', setNewUser)}
          keyboardType="default"
          ref={lastNameInputRef}
          returnKeyType="next"
          onSubmitEditing={() => {
            emailInputRef.current && emailInputRef.current.focus();
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email Address</Text>
        <TextInput
          value={newUser.email}
          style={styles.input}
          onChangeText={(email) => handleTextChange(email, 'email', setNewUser)}
          keyboardType="email-address"
          autoCapitalize="none"
          ref={emailInputRef}
          onFocus={() => setEmailError(null)}
          onBlur={handleEmailCheck}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current && passwordInputRef.current.focus();
          }}
        />
        {emailError && <Text>{emailError.message}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          value={newUser.password}
          style={styles.input}
          onChangeText={(password) => handleTextChange(password, 'password', setNewUser)}
          ref={passwordInputRef}
          returnKeyType="next"
          secureTextEntry={true}
          onSubmitEditing={() => {
            confirmPasswordInputRef.current && confirmPasswordInputRef.current.focus();
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Re-enter Password</Text>
        <TextInput
          value={newUser.confirm_password}
          style={styles.input}
          onChangeText={(confirmPassword) =>
            handleTextChange(confirmPassword, 'confirm_password', setNewUser)
          }
          ref={confirmPasswordInputRef}
          returnKeyType="next"
          secureTextEntry={true}
          onSubmitEditing={() => {
            confirmPasswordInputRef.current && confirmPasswordInputRef.current.focus();
          }}
        />
        {newUser.password !== '' && (
          <Text>
            {newUser.password === newUser.confirm_password
              ? 'Passwords match.'
              : 'Passwords do not match.'}
          </Text>
        )}
      </View>
      {/* Replace with SingleButton Component */}
      <TouchableOpacity style={styles.singleButton} onPress={() => handleSignUp()} color="white">
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.inlineText}>
          Already have an account?
          <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
            Sign in.
          </Text>
        </Text>
      </View>
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
  centeredView: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  input: {
    borderRadius: 5,
    borderStyle: 'solid',
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
  inlineText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
  },
  link: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
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
