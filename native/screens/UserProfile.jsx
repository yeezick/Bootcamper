import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// components
import { ShowPortfolioProjects } from '../components/PortfolioCard/ShowPortfolioProjects.jsx';
import { EditProfile } from './EditProfile';
// assets
import { uiActions } from '../services/redux/slices/uiSlice';
import { getOneUser } from '../services/api/users';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getAllUsers } from '../services/api/users';

export const UserProfile = () => {
  const { user: reduxUser, toggleEditUser } = useSelector((state) => state.ui);
  const [currUser, setCurrUser] = useState({
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    about: '',
    fun_fact: '',
    portfolio_link: '',
  });
  const dispatch = useDispatch();
  // const params = useParams(); => done differently
  const validUrl = `http://${reduxUser.portfolio_link}`;
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

  const handleToggleMode = () => {
    dispatch(uiActions.toggleEditUser());
  };
  if (toggleEditUser) {
    return (
      <>
        <Button title="back to profile" onPress={handleToggleMode} />
        <EditProfile currUser={currUser} />
      </>
    );
  } else {
    const { about, email, fun_fact, first_name, last_name, role, _id: currUserId } = currUser;

    return (
      <View>
        <Button title="toggle edit mode" onPress={handleToggleMode} />
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

        <ShowPortfolioProjects currUser={currUser} />
      </View>
    );
  }
};
