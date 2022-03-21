import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// // components
// import { ShowPortfolioProjects } from "../components/Projects/PortfolioCard/PortfolioCard";
// import { EditProfile } from "./EditProfile/EditProfile";
// // assets
// import { uiActions } from "../../services/redux/slices/uiSlice";
// import "./UserProfile.scss";
// import { getOneUser } from "../../services/api/users";
import { StyleSheet, Text, View } from 'react-native';
import { getAllUsers } from '../services/api/users';

export const UserProfile = () => {
  const [currUser, setCurrUser] = useState({
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    about: '',
    fun_fact: '',
    portfolio_link: '',
  });

  useEffect(() => {
    const setUser = async () => {
      const { data: users } = await axios.get(
        'https://bootcamper-dev-backend.herokuapp.com/api/users'
      );
      console.log('user', users[0]);
      setCurrUser(users[0]);
    };
    setUser();
  }, []);

  // console.log('currUser', currUser);
  //   useEffect(() => {
  //     const setUser = async () => {
  //       if (params.id === reduxUser._id) {
  //         setCurrUser(reduxUser);
  //       } else {
  //         const res = await getOneUser(params.id);
  //         setCurrUser(res);
  //       }
  //     };
  //     setUser();
  //   }, [params]);

  //   const handleToggleMode = () => {
  //     dispatch(uiActions.toggleEditUser());
  //   };
  const { about, email, fun_fact, first_name, last_name, role, _id: currUserId } = currUser;

  return (
    <View>
      {/* TITLE WRAPPER */}
      <View>
        <Text>
          {first_name} {last_name}
        </Text>
        <Text>{role}</Text>
      </View>

      <Text> I AM AN IMAGE</Text>
      {/* LINKS WRAPPER */}
      <View>
        <Text>{email}</Text>
        <Text>PORTFOLIO LINK</Text>
      </View>

      {/* CONTENT WRAPPER */}
      <View>
        <Text>{about}</Text>
      </View>

      {/* FUN FACT WRAPPER */}
      <View>
        <Text>{fun_fact}</Text>
      </View>
    </View>
  );
};

// export const ReactUserProfile = () => {
//   const { user: reduxUser, toggleEditUser } = useSelector((state) => state.ui);
//   const [currUser, setCurrUser] = useState({
//     first_name: "",
//     last_name: "",
//     role: "",
//     email: "",
//     about: "",
//     fun_fact: "",
//     portfolio_link: "",
//   });
//   const dispatch = useDispatch();
//   const params = useParams();
//   const validUrl = `http://${reduxUser.portfolio_link}`;

//   useEffect(() => {
//     const setUser = async () => {
//       if (params.id === reduxUser._id) {
//         setCurrUser(reduxUser);
//       } else {
//         const res = await getOneUser(params.id);
//         setCurrUser(res);
//       }
//     };
//     setUser();
//   }, [params]);

//   const handleToggleMode = () => {
//     dispatch(uiActions.toggleEditUser());
//   };

//   if (toggleEditUser) {
//     return (
//       <>
//         <button onClick={handleToggleMode}>back to profile</button>
//         <EditProfile currUser={currUser} />
//       </>
//     );
//   } else {
//     const {
//       about,
//       email,
//       fun_fact,
//       first_name,
//       last_name,
//       role,
//       _id: currUserId,
//     } = currUser;
//     return (
//       <div className="user-profile">
//         <div className="title-wrapper">
//           {currUserId === reduxUser._id && (
//             <button onClick={handleToggleMode}>edit profile</button>
//           )}
//           <h2 className="title-name">
//             {first_name} {last_name}
//           </h2>
//           <h2 className="title-role">{role}</h2>
//         </div>
//         <div className="image">im an image</div>

//         <div className="links">
//           <a href={`mailto:${email}`} target="">
//             E-mail
//           </a>
//           <a href={validUrl} target="_blank">
//             Portfolio
//           </a>
//         </div>

//         <div className="content">
//           <div className="about">
//             <h3>About</h3>
//             <p>{about}</p>
//           </div>

//           {fun_fact && (
//             <div className="fun-fact">
//               <h3>Fun Fact</h3>
//               <p>{fun_fact}</p>
//             </div>
//           )}
//         </div>

//         <ShowPortfolioProjects currUser={currUser} />
//       </div>
//     );
//   }
// };
