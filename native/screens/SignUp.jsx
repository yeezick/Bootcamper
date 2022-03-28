import { useState, createRef } from 'react';
import { useDispatch } from "react-redux";
import { signUpUser } from "../services/redux/actions/uiActions.js";
import { checkEmailAuth, verify } from '../services/api/users.js';

// Native Components
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Alert, 
  Modal 
} from "react-native";


export const SignUp = ({ navigation }) => {
  // redux
  const dispatch = useDispatch();
  // state
  const [emailError, setEmailError] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  // input references
  const { 
    firstNameInputRef, 
    lastNameInputRef, 
    emailInputRef, 
    passwordInputRef, 
    confirmPasswordInputRef } = createRef();

  
  const handleSignUp =  () => {
    if (newUser.confirm_password !== newUser.password) {
      setNewUser((prevState) => {
        return {
          ...prevState,
          confirm_password: "",
          password: "",
        };
      });
      Alert.alert('Passwords do not match. Please try again.')
    } else if (emailError) {
      Alert.alert(`Account with email ${newUser.email} already exists. Please use a different email or sign in to your account.`)
      setNewUser((prevState) => {
        return {
          ...prevState,
          confirm_password: "",
          password: "",
        };
      });
      setEmailError(null);
    } else {
      dispatch(signUpUser(newUser));
      setSuccessModalVisible(true);
      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
      })
    }
  };

  // Check if email is already in use
  const handleEmailCheck = async () => {
    const emailReq = {email: newUser.email}
    const res = await checkEmailAuth(emailReq);
    if (res) {
      setEmailError(res);
    }
  };

  const handleReroute = async (screen) => {
    let id = null;
    if (screen === 'EditProfile') {
      let resp = await verify();
      id = resp._id;
    }
    setSuccessModalVisible(false);
    // need to test this params funcionality on edit profile screen
    navigation.navigate(screen, {
      id: id,
    });
  };


  return (
    <View style={styles.accountForms}>
      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="slide"
        >
        <View style={styles.modalContainer}>
          <Text style={styles.centeredView}>Success!</Text>
            {/* Replace these with SingleButton or DoubleButton component*/}
          <TouchableOpacity
            style={styles.singleButton}
            onPress={()=>handleReroute('EditProfile')}
            color="white">
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleButton}
            onPress={()=> handleReroute('Roulette')}
            color="white">
            <Text style={styles.buttonText}>Go to Roulette</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={styles.title} >Create an Account</Text>
      {/* Replace with Form componenet? */}
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput 
          value={newUser.first_name}
          style={styles.input}
          onChangeText={(firstName) => setNewUser((prevState) => {
            return {
              ...prevState,
              first_name: firstName,
            }
          })}
          keyboardType="default"
          ref={firstNameInputRef}
          returnKeyType="next"
          onSubmitEditing={() => {
            lastNameInputRef.current &&
            lastNameInputRef.current.focus()
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Last Name</Text>
        <TextInput 
          value={newUser.last_name}
          style={styles.input}
          onChangeText={(lastName) => setNewUser((prevState) => {
            return {
              ...prevState,
              last_name: lastName
            }
          })}
          keyboardType="default"
          ref={lastNameInputRef}
          returnKeyType="next"
          onSubmitEditing={() => {
            emailInputRef.current &&
            emailInputRef.current.focus()
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email Address</Text>
        <TextInput
          value={newUser.email}
          style={styles.input}
          onChangeText={(email) => setNewUser((prevState) => {
            return {
              ...prevState,
              email: email
            }
          })}
          keyboardType="email-address"
          autoCapitalize="none"
          ref={emailInputRef}
          onFocus={()=>setEmailError(null)}
          onBlur={() => handleEmailCheck()}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current &&
            passwordInputRef.current.focus()
          }}
        />
        <Text>{emailError}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput 
          value={newUser.password}
          style={styles.input}
          onChangeText={(password) => setNewUser((prevState) => {
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
      <View style={styles.inputContainer}>
        <Text>Re-enter Password</Text>
        <TextInput 
          value={newUser.confirm_password}
          style={styles.input}
          onChangeText={(confirmPassword) => setNewUser((prevState) => {
            return {
              ...prevState,
              confirm_password: confirmPassword
            }
          })}
          ref={confirmPasswordInputRef}
          returnKeyType="next"
          secureTextEntry={true}
          onSubmitEditing={() => {
            confirmPasswordInputRef.current &&
            confirmPasswordInputRef.current.focus()
          }}
        />
        { newUser.password !== "" && 
        <Text>
          {newUser.password === newUser.confirm_password ? 
            "Passwords match." : "Passwords do not match." }
        </Text> }
      </View>
      {/* Replace with SingleButton Component */}
      <TouchableOpacity
        style={styles.singleButton}
        onPress={() => handleSignUp()}
        color="white">
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.inlineText}>
          Already have an account? 
        <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
          Sign in.</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
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
  },
  inlineText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
  },
  link : {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
});