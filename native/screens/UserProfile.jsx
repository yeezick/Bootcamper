import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowPortfolioProjects } from '../components/PortfolioCard/ShowPortfolioProjects.jsx';
import { uiActions } from '../services/redux/slices/uiSlice';
import { getOneUser } from '../services/api/users';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export const UserProfile = ({ route, navigation }) => {
  const { user: reduxUser } = useSelector((state) => state.ui);
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
  const validUrl = `http://${reduxUser.portfolio_link}`;
  const { about, email, fun_fact, first_name, last_name, role, _id: currUserID } = currUser;
  useEffect(() => {
    const setUser = async () => {
      if (route.params === undefined || route.params.userID === reduxUser._id) {
        setCurrUser(reduxUser);
      } else {
        const res = await getOneUser(route.params.userID); // must be tested
        setCurrUser(res);
      }

      dispatch(uiActions.toggleEditMode());
    };
    setUser();
  }, [route.params]);

  const handleToggleMode = () => {
    dispatch(uiActions.toggleEditMode(true));
    navigation.navigate('EditProfile', {
      userID: currUserID,
    });
  };

  return (
    <ScrollView>
      {reduxUser._id === currUser._id && <Button title="toggle edit mode" onPress={handleToggleMode} />}
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
    </ScrollView>
  );
};
