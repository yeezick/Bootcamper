
// import { useNavigate } from "react-router-dom";
// // assets
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../services/redux/slices/uiActions.js";
// import "../SignUp/SignUp.scss";
// import { handleChange } from "../../services/utils/formHandlers";
// import { SingleActionButton } from "../components/Button/SingleActionButton";
// import { checkEmailAuth, signOut, verify } from "../../services/api/users";
import { useDispatch } from 'react-redux';
import { signOut, checkEmailAuth, verify } from '../services/api/users.js';
import { loginUser } from '../services/redux/actions/uiActions.js';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Button,
  Alert,
} from "react-native";
import { useState, createRef, useEffect } from 'react';

export const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const [noAccountError, setNoAccountError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [logInInfo, setLogInInfo] = useState({
    email: '',
    password: '',
  });

  const { emailInputRef, passwordInputRef } = createRef();

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

// export const ReactSignIn = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { _id: userId } = useSelector((state) => state.ui.user);
//   const [authError, setAuthError] = useState(null);
//   const [noAccountError, setNoAccountError] = useState(null);
//   const [loginInfo, setLoginInfo] = useState({
//     email: "test@test.com",
//     password: "test",
//   });

  // useEffect(() => {
  //   signOut();
  // }, []);

  // const handleSignIn = async (event) => {
  //   event.preventDefault();
  //   await dispatch(loginUser(loginInfo));
  //   const user = await verify();
  //   if (user.email === loginInfo.email) {
  //     navigate(`/users/${userId}/edit`);
  //   } else {
  //     setAuthError(
  //       "Invalid credentials. Please check your details and try again."
  //     );
  //     setLoginInfo((prevState) => {
  //       return {
  //         ...prevState,
  //         password: "",
  //       };
  //     });
  //   }
  // };

  // const validEmail = async () => {
  //   const emailReq = { email: loginInfo.email };
  //   const res = await checkEmailAuth(emailReq);
  //   if (!res) {
  //     setNoAccountError("Account not found.");
  //   }
  // };

//   return (
//     <div className="sign-in-screen auth-form">
//       <h4>Welcome Back!</h4>
//       <form className="form sign-in" onSubmit={handleSignIn}>
//         <div className="input-wrapper">
//           <label htmlFor="email">Email</label>
//           <input
//             required
//             id="email"
//             name="email"
//             onChange={(e) => handleChange(e, "email", setLoginInfo)}
//             type="email"
//             value={loginInfo["email"]}
//             onFocus={() => setNoAccountError(false)}
//             onBlur={() => validEmail()}
//           />
//         </div>
//         <div className="form-error">
//           <h6>{noAccountError}</h6>
//         </div>
//         <div className="input-wrapper">
//           <label htmlFor="password">Password</label>
//           <input
//             required
//             id="password"
//             name="password"
//             onChange={(e) => handleChange(e, "password", setLoginInfo)}
//             type="password"
//             value={loginInfo["password"]}
//             onFocus={() => setAuthError(null)}
//           />
//         </div>
//         <div className="form-error">
//           <h6>{authError}</h6>
//         </div>
//         <SingleActionButton text="Log In" type="submit" />
//       </form>
//       {/* Placeholder for future functionality  */}
//       <a href="#">Forgot Password?</a>
//     </div>
//   );
// };
