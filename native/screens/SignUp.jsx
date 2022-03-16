// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// // assets
// import { useDispatch } from "react-redux";
// import { signUpUser } from "../../services/redux/slices/uiActions.js";
// import { GenericModal } from "../components/Modal/GenericModal.jsx";
// import "./SignUp.scss";
// import { checkEmailAuth, verify } from "../../services/api/users.js";
// import { handleChange } from "../../services/utils/formHandlers";
// import { SingleActionButton } from "../components/Button/SingleActionButton.jsx";
// import { DoubleActionModal } from "../components/Modal/DoubleActionModal.jsx";
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity } from "react-native";
import { useState, createRef } from 'react';


export const SignUp = () => {
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const firstNameInputRef = createRef();
  const lastNameInputRef = createRef();
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();


  return (
    <View style={styles.accountForms}>
      <Text style={styles.title} >Create an Account</Text>
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput 
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
          style={styles.input}
          onChangeText={(email) => setNewUser((prevState) => {
            return {
              ...prevState,
              email: email
            }
          })}
          keyboardType="email"
          ref={emailInputRef}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current &&
            passwordInputRef.current.focuse()
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput 
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
      </View>
      <TouchableOpacity
        style={styles.singleButton}
        onPress={() => Alert.alert('Register button pressed')}
        color="white">
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.inlineText}>Already have an account? <Text 
            style={styles.link}
            onPress={() => Alert.alert('Sign in button pressed')}
          >Sign in.</Text>
        </Text>
      </View>
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

// export const ReactSignUp = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [modalError, setModalError] = useState("");
//   const [emailError, setEmailError] = useState(null);
//   const [newUser, setNewUser] = useState({
//     confirm_password: "",
//     email: "",
//     first_name: "",
//     last_name: "",
//     password: "",
//   });

//   const handleSignUp = async (event) => {
//     event.preventDefault();
//     if (newUser.confirm_password !== newUser.password) {
//       setNewUser((prevState) => {
//         return {
//           ...prevState,
//           confirm_password: "",
//           password: "",
//         };
//       });
//       setModalError("Passwords do not match. Please try again.");
//       setShowModal(true);
//     } else if (emailError) {
//       setModalError(
//         "An account with this email already exists. Please try another email or Sign in."
//       );
//       setShowModal(true);
//       setNewUser((prevState) => {
//         return {
//           ...prevState,
//           email: "",
//           confirm_password: "",
//           password: "",
//         };
//       });
//       setEmailError(null);
//     } else {
//       dispatch(signUpUser(newUser));
//       setShowSuccessModal(true);
//     }
//   };

//   const handleEmailCheck = async (e) => {
//     const emailReq = { email: e.target.value };
//     const res = await checkEmailAuth(emailReq);
//     if (res) {
//       setEmailError(res);
//     }
//   };

//   const handleEditProfile = async () => {
//     const { _id } = await verify();
//     navigate(`/users/${_id}/edit`);
//   };

//   return (
//     <div className="sign-up-screen auth-form">
//       {showSuccessModal && (
//         <DoubleActionModal
//           setShowModal={setShowSuccessModal}
//           bodyText="Success! Do you want to finish setting up your profile or try out the Roulette?"
//           leftText="Finish Profile"
//           leftOnClick={() => handleEditProfile()}
//           rightText="Go to Roulette"
//           rightOnClick={() => navigate("/roulette")}
//         />
//       )}
//       {showModal && (
//         <GenericModal
//           bodyText={modalError}
//           buttonText="Ok"
//           setShowModal={setShowModal}
//         />
//       )}
//       <h4>Create an account</h4>
//       <form className="form sign-up" onSubmit={handleSignUp}>
//         <div className="input-wrapper">
//           <label htmlFor="first_name">Name</label>
//           <input
//             required
//             id="first_name"
//             name="first_name"
//             onChange={(e) => handleChange(e, "first_name", setNewUser)}
//             type="text"
//             value={newUser["first_name"]}
//           />
//         </div>
//         <div className="input-wrapper">
//           <label htmlFor="last_name">Last Name</label>
//           <input
//             required
//             id="last_name"
//             name="last_name"
//             onChange={(e) => handleChange(e, "last_name", setNewUser)}
//             type="text"
//             value={newUser["last_name"]}
//           />
//         </div>
//         <div className="input-wrapper">
//           <label htmlFor="email">Email Address</label>
//           <input
//             required
//             id="email"
//             name="email"
//             onChange={(e) => handleChange(e, "email", setNewUser)}
//             type="email"
//             value={newUser["email"]}
//             onFocus={() => setEmailError(null)}
//             onBlur={(e) => handleEmailCheck(e)}
//           />
//         </div>
//         <div className="form-error">
//           <h6>{emailError}</h6>
//         </div>
//         <div className="input-wrapper">
//           <label htmlFor="password">Password</label>
//           <input
//             required
//             id="password"
//             name="password"
//             onChange={(e) => handleChange(e, "password", setNewUser)}
//             type="password"
//             value={newUser["password"]}
//           />
//         </div>
//         <div className="input-wrapper">
//           <label htmlFor="confirm_password">Re-enter Password</label>
//           <input
//             required
//             id="confirm_password"
//             name="confirm_password"
//             onChange={(e) => handleChange(e, "confirm_password", setNewUser)}
//             type="password"
//             value={newUser["confirm_password"]}
//           />
//         </div>
//         <div className="form-error">
//           {newUser.password !== "" && (
//             <h6>
//               {newUser.password === newUser.confirm_password
//                 ? "Passwords match."
//                 : "Passwords do not match."}
//             </h6>
//           )}
//         </div>
//         <SingleActionButton text="Register" type="submit" />
//       </form>
//       <h6>
//         Already have an account? <Link to="/sign-in">Sign in.</Link>
//       </h6>
//     </div>
//   );
// };
